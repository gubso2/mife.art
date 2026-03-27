import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const GITHUB_OWNER = "gubso2";
const GITHUB_REPO = "mife.art";
const GITHUB_BRANCH = "main";

async function isAuthenticated() {
  const cookieStore = await cookies();
  return cookieStore.has("admin_token");
}

async function githubPut(path: string, content: string, message: string) {
  const token = process.env.GITHUB_TOKEN;

  // Check if file exists to get its SHA (needed for updates)
  let sha: string | undefined;
  const getRes = await fetch(
    `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${path}?ref=${GITHUB_BRANCH}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  if (getRes.ok) {
    const data = await getRes.json();
    sha = data.sha;
  }

  const res = await fetch(
    `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${path}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        content,
        branch: GITHUB_BRANCH,
        ...(sha ? { sha } : {}),
      }),
    }
  );

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`GitHub API error: ${res.status} ${error}`);
  }

  return res.json();
}

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();

    const title = formData.get("title") as string;
    const medium = formData.get("medium") as string;
    const dimensions = formData.get("dimensions") as string;
    const price = Number(formData.get("price"));
    const description = formData.get("description") as string;
    const featured = formData.get("featured") === "true";
    const farImage = formData.get("farImage") as File;
    const closeImage = formData.get("closeImage") as File | null;

    if (!title || !farImage) {
      return NextResponse.json(
        { error: "Title and far image are required" },
        { status: 400 }
      );
    }

    // Generate slug and determine next number
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    // Get current artwork.json
    const artworkRes = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/src/data/artwork.json?ref=${GITHUB_BRANCH}`,
      { headers: { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } }
    );
    const artworkFile = await artworkRes.json();
    const currentArtwork = JSON.parse(
      Buffer.from(artworkFile.content, "base64").toString("utf-8")
    );

    // Find the next number by looking at existing image filenames
    let maxNum = 0;
    for (const art of currentArtwork) {
      const match = art.images[0]?.match(/^(\d+)\s/);
      if (match) {
        maxNum = Math.max(maxNum, parseInt(match[1]));
      }
    }
    const nextNum = maxNum + 1;

    // Upload far image
    const farExt = farImage.name.split(".").pop()?.toLowerCase() || "jpg";
    const farFileName = `${nextNum} far.${farExt}`;
    const farBuffer = Buffer.from(await farImage.arrayBuffer());
    await githubPut(
      `public/artwork/${farFileName}`,
      farBuffer.toString("base64"),
      `Add artwork image: ${farFileName}`
    );

    // Upload close image if provided
    let closeFileName: string | undefined;
    if (closeImage && closeImage.size > 0) {
      const closeExt = closeImage.name.split(".").pop()?.toLowerCase() || "jpg";
      closeFileName = `${nextNum} close.${closeExt}`;
      const closeBuffer = Buffer.from(await closeImage.arrayBuffer());
      await githubPut(
        `public/artwork/${closeFileName}`,
        closeBuffer.toString("base64"),
        `Add artwork detail image: ${closeFileName}`
      );
    }

    // Add new artwork entry
    const newArtwork = {
      slug,
      title,
      medium: medium || "Acrylic on canvas",
      dimensions: dimensions || "",
      year: new Date().getFullYear(),
      price,
      currency: "AUD",
      sold: false,
      featured,
      images: [farFileName],
      ...(closeFileName ? { closeImage: closeFileName } : {}),
      description: description || "",
    };

    currentArtwork.push(newArtwork);

    // Update artwork.json
    await githubPut(
      "src/data/artwork.json",
      Buffer.from(JSON.stringify(currentArtwork, null, 2) + "\n").toString(
        "base64"
      ),
      `Add new artwork: ${title}`
    );

    return NextResponse.json({ success: true, slug });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Upload failed" },
      { status: 500 }
    );
  }
}
