# Cheat-sheet food illustrations

All 12 images in this folder are **AI-generated** for the guide, so there is no third-party
attribution to give. No stock photos, no licensing strings attached.

- Tool: OpenAI `gpt-image-1` via `tools/gen-food-images.js`
- Style: warm hand-painted gouache, cream paper background, no text/labels (the red "crossed out"
  treatment is added in CSS, not baked into the image)
- Format: WebP, compressed at generation (`output_compression: 70`), each file < ~130 KB for a light PDF
- Regenerate / change a prompt: edit the `JOBS` list in `tools/gen-food-images.js` and run
  `node gen-food-images.js --force` (or `--only id1,id2`)

Avoid set (shown with a red cross): `cola, sweets, chips, meat, white, ready`
Good set (shown with a green check): `veg, fish, eggs, beans, fruit, yogurt`
