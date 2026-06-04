import ffmpeg from 'fluent-ffmpeg';
import ffmpegStatic from 'ffmpeg-static';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure fluent-ffmpeg uses the downloaded static binary
ffmpeg.setFfmpegPath(ffmpegStatic);

const inputPath = path.resolve(__dirname, '../src/assets/hero-video.mp4');
const outputPath = path.resolve(__dirname, '../src/assets/hero-video-compressed.mp4');

console.log('Starting video compression...');
console.log(`Input: ${inputPath}`);
console.log(`Output: ${outputPath}`);

ffmpeg(inputPath)
  .outputOptions([
    '-c:v libx264',
    '-crf 28',         // Higher means lower quality and smaller size (default 23, 28 is good for backgrounds)
    '-preset fast',    // Speed up compression
    '-vf scale=1280:-2', // Scale to 720p width, keep aspect ratio
    '-an'              // Remove audio entirely
  ])
  .on('start', (commandLine) => {
    console.log('Spawned Ffmpeg with command: ' + commandLine);
  })
  .on('progress', (progress) => {
    console.log(`Processing: ${progress.percent ? progress.percent.toFixed(2) : '0'}% done`);
  })
  .on('end', () => {
    console.log('Compression finished successfully!');
  })
  .on('error', (err) => {
    console.error('An error occurred during compression: ' + err.message);
  })
  .save(outputPath);
