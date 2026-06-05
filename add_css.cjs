const fs = require('fs');
const css = `
/* Sleek Featured Grid */
.featuredSleekGrid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  margin-top: 30px;
}
.sleekCardLink {
  text-decoration: none;
  color: inherit;
  display: block;
  height: 100%;
}
.sleekCard {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.sleekCard:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(168, 85, 247, 0.4);
  box-shadow: 0 10px 30px -10px rgba(168, 85, 247, 0.3);
}
.sleekImageWrapper {
  position: relative;
  height: 160px;
  width: 100%;
  overflow: hidden;
}
.sleekImage {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}
.sleekCard:hover .sleekImage {
  transform: scale(1.05);
}
.sleekCategoryBadge {
  position: absolute;
  top: 10px;
  left: 10px;
  background: rgba(168, 85, 247, 0.9);
  color: white;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
  backdrop-filter: blur(4px);
}
.sleekContent {
  padding: 20px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
.sleekTitle {
  font-size: 16px;
  font-weight: 600;
  line-height: 1.4;
  margin-bottom: 15px;
  color: rgba(255, 255, 255, 0.95);
  transition: color 0.3s ease;
}
.sleekCard:hover .sleekTitle {
  color: var(--color-cyan);
}
.sleekMeta {
  margin-top: auto;
  display: flex;
  align-items: center;
  gap: 8px;
  color: rgba(255, 255, 255, 0.5);
  font-size: 12px;
}
`;
fs.appendFileSync('src/pages/Blog.module.css', css);
console.log('CSS appended successfully!');
