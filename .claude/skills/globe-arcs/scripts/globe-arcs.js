/* Dotted globe with animated arcs, drawn on a <canvas>. No dependencies. */
(function () {
  var LAND = '000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003ffe7afed40000000000000000000000000000000000bffe1fffff40002f00000000e00000000000000000030a0fbffffff000074000000000800000000000000003ec4c000fffff000000000070007fe000400000000000f00540003fffe0000000003000bff8002000000000000df4c2f801fff6000000000c062fffffe0f8000007fe060ff38df817ffe00000380008fffffffffffc00c0ffffff865c8fc0ffc000003ffc5bfeffffffffffffff9fffffffffe87b07e81e0007ff1fffffffffffffffff003ffffffffdd3c07c01c000fbfbfffffffffffffffff00fffffffff03c0038000007e7fffffffffffffffff7c01fd0fffffe00e0000000007f03fffffffffffffff100000802fffff00fe000000080e1ffffffffffffff80300002000fffffe0ff000000081c7fffffffffffffe00f00000000ffffff9ffc00000641bffffffffffffffe80c000000003fffffdffe000006e7ffffffffffffffffc04000000001fffffff800000001fffffffffffffffff800000000000fffffff87000000ffffffffffffffffff0000000000007ffffffc80000003fffd7fffffffffffe440000000000fffffff400000003ebf83fffffffffffc600000000000ffffffe00000003f0cf81ffffffffffe0000000000000ffffff800000003e82efffffffffffde08000000000007fffff800000003c066fffffffffffc608000000000003fffff0000000001f000ffffffffffe238000000000001fffff000000001ff000ffffffffffe0e0000000000000ffffc000000003ffce0ffffffffffe0000000000000003ffc4000000003ffffffeffffffffe0000000000000005fc0400000000fffffffeffffffffe0000000000000002fc0000000001ffffff7f1fffffffc00000000000000017c0000000001ffffff3f60ffffff800000000000000003c0a00000003ffffffbff07ffffe000000000000000003c6080000003ffffff9fe01fc7f0000000000000000001fc004000003ffffffdfe01f03f01000000000000000003c000000003ffffffef801e01f820000000000000000007800000003ffffffec000e00f800000000000000000001830000003fffffff0000c00382800000000000000000085e000001ffffffff00040010000000000000000000001ff800000fffffffe000200800c0000000000000000000ffc000007e7ffffe00000040400000000000000000000fff80000001ffffc00000149800000000000000000001fff80000001ffff8000000a3800000000000000000003fffc0000001ffff0000000c7a00000000000000000003ffff0000001fffe000000073a1d000000000000000003ffffe000000fffc000000020303e00000000000000003fffff8000007ffc000000010000f40000000000000001fffff8000007ffc000000003001d00000000000000001fffff0000007ffc000000000280080000000000000000fffff0000007ffe000000000004400000000000000000ffffe0000007ffe30000000001c4000000000000000007fffe000000fffe60000000007e6000000000000000001fffe000000fff86000000000fff000100000000000001fffc0000007ff06000000003fff800000000000000001fffc0000003ff0e00000001ffff800000000000000001ffe00000003ff0c00000001ffffc00000000000000001ffc00000003fe0000000000ffffe00000000000000001ffc00000003fe0000000000ffffe00000000000000001ff800000001fc0000000000ffffe00000000000000001ff800000000f80000000000fe7fe00000000000000001ff000000000e00000000000c03fc00000000000000003fc000000000000000000000000fc00400000000000003fc0000000000000000000000007000300000000000003e00000000000000000000000002800200000000000007c00000000000000000000000001800c00000000000003c00000000000000000000000000001000000000000007800000000000000000000000000003000000000000003c000000000000000000000000000000000000000000078000000000000000000000000000000000000000000070800000000000000000000000000000000000000000038000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000001c0000000000000000000000000000000000000000000200000000000000c0000062000000000000000000000040000000000000fff81ffffffff000000000000000001e000000000201ffff9ffffffffffe000000000001800560000007ffffffffffffffffffffff00000000c01fffff000001ffffffffffffffffffffff8000007fffffffff800007fffffffffffffffffffffff00001fffffffffcc00307ffffffffffffffffffffffff800000fffffffff000780fffffffffffffffffffffffe000003ffffffffff8067fffffffffffffffffffffffff00003fffffffffffffffffffffffffffffffffffffffffeffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';
  var ROWS = 89, COLS = 180, D = Math.PI / 180;

  // Decode the 2-degree land mask into a list of dots, thinned toward the poles.
  var dots = [];
  (function () {
    var bits = '';
    for (var i = 0; i < LAND.length; i++) bits += ('000' + parseInt(LAND[i], 16).toString(2)).slice(-4);
    for (var r = 0; r < ROWS; r++) {
      var lat = 88 - 2 * r, step = Math.max(1, Math.round(1 / Math.cos(lat * D)));
      for (var c = 0; c < COLS; c++) {
        if (c % step) continue;
        if (bits[r * COLS + c] === '1') {
          var la = lat * D, lo = (-180 + 2 * c) * D;
          dots.push([Math.sin(la), Math.cos(la), lo]);
        }
      }
    }
  })();

  function vec(lat, lon) {
    var a = lat * D, b = lon * D;
    return [Math.cos(a) * Math.cos(b), Math.cos(a) * Math.sin(b), Math.sin(a)];
  }

  function mount(canvas, o) {
    o = o || {};
    var size = o.size || 440, R = o.radius || 170, cx = size / 2, cy = size / 2;
    var dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = size * dpr; canvas.height = size * dpr;
    var ctx = canvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    var origin = o.origin || { lat: -23.55, lon: -46.63 };
    var targets = o.targets || [];
    var A = vec(origin.lat, origin.lon);
    var arcs = targets.map(function (t, i) {
      var B = vec(t.lat, t.lon);
      var om = Math.acos(Math.max(-1, Math.min(1, A[0] * B[0] + A[1] * B[1] + A[2] * B[2])));
      var rev = o.mode === 'both' && i % 2 === 1;
      return { from: rev ? B : A, to: rev ? A : B, end: rev ? origin : t, om: om, h: 0.12 + 0.35 * om / Math.PI, name: t.name };
    });

    var arcColor = o.arcColor || '#ffb21e';
    var headColor = o.headColor || '#fff6dc';
    var pointColor = o.pointColor || '#ffb21e';
    var dotColor = o.dotColor || '200,200,200';
    var view = { lon: o.lon != null ? o.lon : -38, lat: o.lat != null ? o.lat : 8 };
    var baseLon = view.lon;
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Drag to rotate
    var drag = null, vel = 0, lastInput = -1e9;
    function onDown(e) { drag = { x: e.clientX, y: e.clientY, lon: view.lon, lat: view.lat }; vel = 0; canvas.setPointerCapture && canvas.setPointerCapture(e.pointerId); canvas.style.cursor = 'grabbing'; }
    function onMove(e) {
      if (!drag) return;
      var nl = drag.lon - (e.clientX - drag.x) * 0.35;
      vel = nl - view.lon; view.lon = nl;
      view.lat = Math.max(-35, Math.min(45, drag.lat + (e.clientY - drag.y) * 0.25));
      lastInput = performance.now();
    }
    function onUp() { drag = null; canvas.style.cursor = 'grab'; lastInput = performance.now(); }
    if (o.drag) {
      canvas.style.cursor = 'grab'; canvas.style.touchAction = 'none';
      canvas.addEventListener('pointerdown', onDown);
      window.addEventListener('pointermove', onMove);
      window.addEventListener('pointerup', onUp);
    }

    function proj(v, r, cl0, sl0, cp0, sp0) {
      // v: unit ECEF vector; rotate so (view.lat, view.lon) faces the viewer
      var lon = Math.atan2(v[1], v[0]), sl = v[2], cl = Math.sqrt(1 - sl * sl);
      var dl = lon - view.lon * D, cd = Math.cos(dl), sd = Math.sin(dl);
      var x = cl * sd, y = cp0 * sl - sp0 * cl * cd, z = sp0 * sl + cp0 * cl * cd;
      return [cx + R * r * x, cy - R * r * y, z, r * r * (x * x + y * y)];
    }

    function slerp(a, b, om, t) {
      if (om < 1e-6) return a;
      var s = Math.sin(om), k1 = Math.sin((1 - t) * om) / s, k2 = Math.sin(t * om) / s;
      return [a[0] * k1 + b[0] * k2, a[1] * k1 + b[1] * k2, a[2] * k1 + b[2] * k2];
    }

    var raf = 0, t0 = performance.now(), prev = t0;
    function frame(now) {
      var t = (now - t0) / 1000, dt = Math.min(0.05, (now - prev) / 1000); prev = now;
      if (!drag) {
        if (o.rotate === 'spin') view.lon += (o.speed || 6) * dt;
        else if (o.rotate === 'sway') view.lon = baseLon + (o.amp || 22) * Math.sin(t * (o.speed || 0.18));
        if (o.drag) {
          vel *= 0.94; view.lon += vel;
          if (now - lastInput > 2500) { view.lon += (baseLon + 14 * Math.sin(t * 0.15) - view.lon) * 0.02; view.lat += ((o.lat != null ? o.lat : 8) - view.lat) * 0.02; }
        }
      }
      draw(reduce ? 2.2 : t);
      if (!reduce) raf = requestAnimationFrame(frame);
    }

    function draw(t) {
      var cp0 = Math.cos(view.lat * D), sp0 = Math.sin(view.lat * D);
      ctx.clearRect(0, 0, size, size);

      // Sphere body + glowing rim
      ctx.save();
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = '#000'; ctx.fill();
      var g = ctx.createRadialGradient(cx, cy, R * 0.55, cx, cy, R);
      g.addColorStop(0, 'rgba(255,255,255,0)'); g.addColorStop(1, 'rgba(255,255,255,0.10)');
      ctx.fillStyle = g; ctx.fill();
      ctx.shadowColor = 'rgba(255,255,255,0.85)'; ctx.shadowBlur = 26;
      ctx.lineWidth = 3; ctx.strokeStyle = '#f5f5f5'; ctx.stroke();
      ctx.restore();

      // Land dots
      var l0 = view.lon * D;
      for (var i = 0; i < dots.length; i++) {
        var d = dots[i], dl = d[2] - l0, cd = Math.cos(dl);
        var z = sp0 * d[0] + cp0 * d[1] * cd;
        if (z <= 0.02) continue;
        var x = d[1] * Math.sin(dl), y = cp0 * d[0] - sp0 * d[1] * cd;
        ctx.fillStyle = 'rgba(' + dotColor + ',' + (0.18 + 0.62 * z).toFixed(2) + ')';
        var s = 0.8 + 0.7 * z;
        ctx.fillRect(cx + R * x - s / 2, cy - R * y - s / 2, s, s);
      }

      // Arcs
      var cycle = o.cycle || 5.4, stagger = o.stagger || 0.9, grow = 1.3, chase = 0.9;
      arcs.forEach(function (a, i) {
        var lt = ((t - i * stagger) % cycle + cycle) % cycle;
        if (t - i * stagger < 0) return;
        var head = Math.min(1, lt / grow), tail = Math.max(0, Math.min(1, (lt - grow * 0.75) / chase));
        if (tail >= 1) { ripple(a.end, lt - grow, cp0, sp0, a.name); return; }
        // Screen-space bend so arcs read as curves even when they cross the globe's center
        var s0 = proj(a.from, 1, 0, 0, cp0, sp0), e0 = proj(a.to, 1, 0, 0, cp0, sp0);
        var dx = e0[0] - s0[0], dy = e0[1] - s0[1], len = Math.sqrt(dx * dx + dy * dy) || 1;
        var nx = -dy / len, ny = dx / len;
        if (ny > 0) { nx = -nx; ny = -ny; }
        var bend = 0.2 * len;
        var N = 56, pts = [];
        for (var k = 0; k <= N; k++) {
          var u = tail + (head - tail) * k / N, sn = Math.sin(Math.PI * u);
          var p = proj(slerp(a.from, a.to, a.om, u), 1 + a.h * sn, 0, 0, cp0, sp0);
          p[0] += nx * bend * sn; p[1] += ny * bend * sn;
          p.push(k / N); pts.push(p);
        }
        ctx.save(); ctx.lineCap = 'round';
        for (var k2 = 1; k2 < pts.length; k2++) {
          var p1 = pts[k2 - 1], p2 = pts[k2];
          if (!(p2[2] > 0 || p2[3] > 1)) continue;
          ctx.strokeStyle = hexA(arcColor, 0.15 + 0.85 * p2[4]);
          ctx.lineWidth = 1 + 1.2 * p2[4];
          ctx.beginPath(); ctx.moveTo(p1[0], p1[1]); ctx.lineTo(p2[0], p2[1]); ctx.stroke();
        }
        var hp = pts[pts.length - 1];
        if (head < 1 && (hp[2] > 0 || hp[3] > 1)) {
          ctx.shadowColor = arcColor; ctx.shadowBlur = 14; ctx.fillStyle = headColor;
          ctx.beginPath(); ctx.arc(hp[0], hp[1], 2.6, 0, Math.PI * 2); ctx.fill();
        }
        ctx.restore();
        if (head >= 1) ripple(a.end, lt - grow, cp0, sp0, a.name);
      });

      // Origin: pulsing point
      var op = proj(A, 1, 0, 0, cp0, sp0);
      if (op[2] > 0) {
        for (var r = 0; r < 2; r++) {
          var ph = ((t * 0.7 + r * 0.5) % 1);
          ctx.beginPath(); ctx.arc(op[0], op[1], 4 + ph * 22, 0, Math.PI * 2);
          ctx.strokeStyle = hexA(pointColor, 0.7 * (1 - ph)); ctx.lineWidth = 1.5; ctx.stroke();
        }
        ctx.save(); ctx.shadowColor = pointColor; ctx.shadowBlur = 16; ctx.fillStyle = pointColor;
        ctx.beginPath(); ctx.arc(op[0], op[1], 4.5, 0, Math.PI * 2); ctx.fill(); ctx.restore();
        if (o.originLabel) label(op[0], op[1], o.originLabel, 1);
      }
    }

    function ripple(end, rt, cp0, sp0, name) {
      if (rt < 0 || rt > 1.6) return;
      var p = proj(vec(end.lat, end.lon), 1, 0, 0, cp0, sp0);
      if (p[2] <= 0) return;
      var k = Math.min(1, rt / 0.9);
      ctx.beginPath(); ctx.arc(p[0], p[1], 2 + k * 14, 0, Math.PI * 2);
      ctx.strokeStyle = hexA(arcColor, 0.8 * (1 - k)); ctx.lineWidth = 1.4; ctx.stroke();
      ctx.fillStyle = hexA(headColor, 1 - rt / 1.6);
      ctx.beginPath(); ctx.arc(p[0], p[1], 2.2, 0, Math.PI * 2); ctx.fill();
      if (o.labels && name) label(p[0], p[1], name, Math.min(1, (1.6 - rt) * 2));
    }

    function label(x, y, text, alpha) {
      ctx.save();
      ctx.globalAlpha = Math.max(0, alpha);
      ctx.font = '500 11px Sora, sans-serif';
      var w = ctx.measureText(text).width + 14, lx = x + 10, ly = y - 24;
      if (lx + w > size - 4) lx = x - 10 - w;
      ctx.fillStyle = 'rgba(20,20,20,0.92)'; ctx.strokeStyle = 'rgba(255,255,255,0.18)';
      ctx.beginPath(); roundRect(lx, ly, w, 20, 10); ctx.fill(); ctx.stroke();
      ctx.fillStyle = '#f2f2f2'; ctx.fillText(text, lx + 7, ly + 14);
      ctx.restore();
    }
    function roundRect(x, y, w, h, r) {
      ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r);
      ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath();
    }
    function hexA(hex, a) {
      var n = parseInt(hex.slice(1), 16);
      return 'rgba(' + (n >> 16 & 255) + ',' + (n >> 8 & 255) + ',' + (n & 255) + ',' + Math.max(0, Math.min(1, a)).toFixed(3) + ')';
    }

    raf = requestAnimationFrame(frame);
    return {
      stop: function () {
        cancelAnimationFrame(raf);
        if (o.drag) {
          canvas.removeEventListener('pointerdown', onDown);
          window.removeEventListener('pointermove', onMove);
          window.removeEventListener('pointerup', onUp);
        }
      }
    };
  }

  window.GlobeArcs = { mount: mount };
})();
