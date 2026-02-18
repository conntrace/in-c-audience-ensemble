// In C: Audience Ensemble — Score Projection Display
// Canvas-based score with colored markers for each musician.

import { CONFIG } from './config.js';

export class ScoreDisplay {
  constructor(ensemble) {
    this.ensemble = ensemble;
    this.canvas = document.getElementById('score-canvas');
    this.ctx = this.canvas.getContext('2d');

    // Animated marker positions (for smooth transitions)
    this.markerPositions = new Array(CONFIG.musicianCount).fill(1);
    this.targetPositions = new Array(CONFIG.musicianCount).fill(1);

    this._resizeObserver = new ResizeObserver(() => this._onResize());
    this._resizeObserver.observe(this.canvas.parentElement);
    this._onResize();
    this._animate();
  }

  _onResize() {
    const parent = this.canvas.parentElement;
    this.canvas.width = parent.clientWidth;
    this.canvas.height = parent.clientHeight;
    this.draw();
  }

  update() {
    for (let i = 0; i < CONFIG.musicianCount; i++) {
      this.targetPositions[i] = this.ensemble.musicians[i].currentUnit;
    }
  }

  _animate() {
    // Smooth interpolation toward target
    for (let i = 0; i < CONFIG.musicianCount; i++) {
      const diff = this.targetPositions[i] - this.markerPositions[i];
      this.markerPositions[i] += diff * 0.15;
    }
    this.draw();
    requestAnimationFrame(() => this._animate());
  }

  draw() {
    const { ctx, canvas } = this;
    const W = canvas.width;
    const H = canvas.height;
    const N = CONFIG.totalUnits;

    ctx.clearRect(0, 0, W, H);

    const margin = { left: 60, right: 40, top: 50, bottom: 80 };
    const trackW = W - margin.left - margin.right;
    const trackH = H - margin.top - margin.bottom;
    const trackY = margin.top;

    // Draw title
    ctx.fillStyle = '#444460';
    ctx.font = '13px SF Mono, Fira Code, Consolas, monospace';
    ctx.textAlign = 'center';
    ctx.fillText('IN C: SCORE PROJECTION', W / 2, 25);

    // Draw unit grid lines and labels
    const unitWidth = trackW / N;
    for (let u = 1; u <= N; u++) {
      const x = margin.left + (u - 0.5) * unitWidth;

      // Vertical grid line
      ctx.strokeStyle = u % 5 === 0 ? '#2a2a3a' : '#16161e';
      ctx.lineWidth = u % 5 === 0 ? 1 : 0.5;
      ctx.beginPath();
      ctx.moveTo(x, trackY);
      ctx.lineTo(x, trackY + trackH);
      ctx.stroke();

      // Unit number (show every 5th or if few units)
      if (u % 5 === 0 || N <= 20 || u === 1) {
        ctx.fillStyle = '#444460';
        ctx.font = '10px SF Mono, Fira Code, Consolas, monospace';
        ctx.textAlign = 'center';
        ctx.fillText(u.toString(), x, trackY + trackH + 16);
      }
    }

    // Draw horizontal lane lines for each musician
    const laneHeight = trackH / CONFIG.musicianCount;
    for (let i = 0; i < CONFIG.musicianCount; i++) {
      const y = trackY + (i + 0.5) * laneHeight;

      // Lane line
      ctx.strokeStyle = '#1a1a24';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(margin.left, y);
      ctx.lineTo(margin.left + trackW, y);
      ctx.stroke();

      // Musician label on left
      ctx.fillStyle = CONFIG.musicianColors[i];
      ctx.font = 'bold 12px SF Mono, Fira Code, Consolas, monospace';
      ctx.textAlign = 'right';
      ctx.fillText(CONFIG.musicianLabels[i], margin.left - 12, y + 4);

      // Draw marker
      const unitX = margin.left + (this.markerPositions[i] - 0.5) * unitWidth;
      this._drawMarker(unitX, y, CONFIG.musicianColors[i], this.ensemble.musicians[i]);
    }

    // Draw spread indicator
    this._drawSpreadIndicator(margin, trackW, trackH, trackY, unitWidth);

    // Draw legend
    this._drawLegend(W, H);
  }

  _drawMarker(x, y, color, musician) {
    const { ctx } = this;
    const r = 8;

    // Glow
    ctx.save();
    ctx.shadowColor = color;
    ctx.shadowBlur = musician.advanceQueued ? 20 : 10;

    // Marker circle
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();

    // Inner highlight
    ctx.beginPath();
    ctx.arc(x, y - 1, r * 0.5, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,0.3)';
    ctx.fill();

    ctx.restore();

    // Queued indicator: pulsing ring
    if (musician.advanceQueued) {
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.arc(x, y, r + 5, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
    }
  }

  _drawSpreadIndicator(margin, trackW, trackH, trackY, unitWidth) {
    const { ctx } = this;
    const minUnit = this.ensemble.getMinUnit();
    const maxUnit = this.ensemble.getMaxUnit();
    const spread = maxUnit - minUnit;

    // Highlight the spread range
    const x1 = margin.left + (minUnit - 1) * unitWidth;
    const x2 = margin.left + maxUnit * unitWidth;
    ctx.fillStyle = spread >= CONFIG.maxSpread
      ? 'rgba(255, 65, 54, 0.05)'
      : 'rgba(255, 255, 255, 0.02)';
    ctx.fillRect(x1, trackY, x2 - x1, trackH);
  }

  _drawLegend(W, H) {
    const { ctx } = this;
    const legendY = H - 25;
    const startX = W / 2 - (CONFIG.musicianCount * 40) / 2;

    ctx.font = '10px SF Mono, Fira Code, Consolas, monospace';
    ctx.textAlign = 'left';

    for (let i = 0; i < CONFIG.musicianCount; i++) {
      const x = startX + i * 40;

      // Color dot
      ctx.beginPath();
      ctx.arc(x, legendY, 4, 0, Math.PI * 2);
      ctx.fillStyle = CONFIG.musicianColors[i];
      ctx.fill();

      // Label
      ctx.fillStyle = '#666680';
      ctx.fillText(CONFIG.musicianLabels[i], x + 8, legendY + 3);
    }
  }
}
