(function () {
  "use strict";
  var C = window.CAU_HINH;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var CHO = "Đang cập nhật";
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function val(v, alt) { return v && String(v).trim() ? esc(v) : '<span class="pend">' + (alt || CHO) + "</span>"; }
  function tenGoi(g, i) { return g.ten && g.ten.trim() ? g.ten : "Gói " + (i + 1) + " (" + CHO.toLowerCase() + ")"; }
  var U = C.uuDai || {}, hanUD = U.ketThuc ? Date.parse(U.ketThuc) : NaN, coUD = !isNaN(hanUD);
  function hetUD() { return coUD && Date.now() >= hanUD; }
  function gia(g) { return g.gia && String(g.gia).trim() && !hetUD() ? esc(g.gia) : '<span class="pend">Liên hệ tư vấn</span>'; }
  var L = C.lienHe, zalo = (L.zalo || "").trim();

  /* ---- Liên hệ ---- */
  var fz = $("#fz");
  if (zalo) { fz.href = zalo; fz.style.display = "grid"; }
  $$("[data-zalo]").forEach(function (a) {
    if (zalo) { a.href = zalo; a.target = "_blank"; a.rel = "noopener"; }
  });
  var lh = [];
  if (L.dienThoai) lh.push('<li>Điện thoại: <a href="tel:' + esc(L.dienThoai.replace(/\s/g, "")) + '">' + esc(L.dienThoai) + "</a></li>");
  if (L.email) lh.push('<li>Email: <a href="mailto:' + esc(L.email) + '">' + esc(L.email) + "</a></li>");
  if (zalo) lh.push('<li>Zalo: <a href="' + esc(zalo) + '" target="_blank" rel="noopener">Nhắn Zalo</a></li>');
  if (L.facebook) lh.push('<li>Facebook: <a href="' + esc(L.facebook) + '" target="_blank" rel="noopener">Trang Facebook</a></li>');
  ["Zalo", "Điện thoại", "Email", "Facebook"].forEach(function (n) {
    var k = { "Zalo": zalo, "Điện thoại": L.dienThoai, "Email": L.email, "Facebook": L.facebook }[n];
    if (!k) lh.push("<li>" + n + ': <span class="pend">' + CHO + "</span></li>");
  });
  $("#f-lien-he").innerHTML = lh.join("");
  $("#lien-he-nhanh").innerHTML = zalo ? "" : '<span class="pend">Kênh Zalo đang cập nhật.</span> Bạn vẫn có thể gửi yêu cầu bằng nút bên cạnh.';

  /* ---- Đồng hồ ưu đãi (hạn thật, cố định) ---- */
  if (coUD) {
    var dems = $$("[data-dem]"), p2 = function (n) { return n < 10 ? "0" + n : "" + n; };
    var tick = function () {
      var con = hanUD - Date.now();
      dems.forEach(function (d) {
        d.classList.remove("hide");
        if (con <= 0) {
          d.classList.add("het"); $("[data-dem-nhan]", d).textContent = "Ưu đãi đã kết thúc. Vui lòng liên hệ tư vấn để biết giá hiện tại."; $("[data-dem-gio]", d).textContent = "";
        } else {
          var s = Math.floor(con / 1000), ng = Math.floor(s / 86400), g = Math.floor(s % 86400 / 3600), ph = Math.floor(s % 3600 / 60), gi = s % 60;
          $("[data-dem-nhan]", d).textContent = U.nhan || "Ưu đãi kết thúc sau";
          $("[data-dem-gio]", d).textContent = (ng ? ng + " ngày " : "") + p2(g) + ":" + p2(ph) + ":" + p2(gi);
        }
      });
      if (con > 0) setTimeout(tick, 1000); else if (!window.__daLai) { window.__daLai = 1; location.reload(); }
    };
    tick();
  }

  /* ---- Nhu cầu ---- */
  $("#nhu-cau-list").innerHTML = C.nhuCau.map(function (n, i) {
    return '<div class="card"><div class="ic" aria-hidden="true">' + esc(n.icon || "✨") + "</div><h3>" + esc(n.tieuDe) + '</h3><p class="mu">' + val(n.mota) + '</p><div class="acts"><a class="btn btn-o btn-sm" href="#tu-van" data-nc="' + i + '">Nhờ tư vấn</a></div></div>';
  }).join("");

  /* ---- Gói ---- */
  $("#goi-list").innerHTML = C.goi.map(function (g, i) {
    var ql = g.quyenLoi && g.quyenLoi.length ? "<ul>" + g.quyenLoi.map(function (q) { return "<li>" + esc(q) + "</li>"; }).join("") + "</ul>" : '<p class="mu pend">Quyền lợi: ' + CHO.toLowerCase() + "</p>";
    return '<article class="card"><h3>' + esc(tenGoi(g, i)) + '</h3><div class="price' + (g.gia && !hetUD() ? "" : " pend") + '">' + gia(g) + (g.gia && !hetUD() && !/VN[ĐD]/i.test(g.gia) ? ' <small style="font-size:.8rem;font-weight:500">VNĐ</small>' : "") + "</div>" +
      '<dl><div><dt>Thời hạn: </dt><dd>' + val(g.thoiHan) + "</dd></div><div><dt>Hình thức: </dt><dd>" + val(g.hinhThuc) + "</dd></div><div><dt>Bàn giao dự kiến: </dt><dd>" + val(g.thoiGianBanGiao) + "</dd></div></dl>" + ql +
      '<div class="acts"><button class="btn btn-o btn-sm" data-ct="' + i + '">Xem chi tiết</button><button class="btn btn-y btn-sm" data-mua="' + i + '">Đăng ký mua</button></div></article>';
  }).join("");

  /* ---- So sánh ---- */
  var cot = [["Giá (VNĐ)", function (g) { return gia(g); }], ["Thời hạn", function (g) { return val(g.thoiHan); }], ["Hình thức cung cấp", function (g) { return val(g.hinhThuc); }],
    ["Quyền lợi", function (g) { return g.quyenLoi && g.quyenLoi.length ? g.quyenLoi.map(esc).join("<br>") : val(""); }], ["Phạm vi hỗ trợ", function (g) { return val(g.hoTro); }]];
  $("#bang").innerHTML = "<thead><tr><th></th>" + C.goi.map(function (g, i) { return "<th>" + esc(tenGoi(g, i)) + "</th>"; }).join("") + "</tr></thead><tbody>" +
    cot.map(function (c) { return "<tr><th>" + c[0] + "</th>" + C.goi.map(function (g) { return "<td>" + c[1](g) + "</td>"; }).join("") + "</tr>"; }).join("") + "</tbody>";

  /* ---- Thanh toán ---- */
  var T = C.thanhToan;
  if (T && T.stk) {
    $("#thanh-toan").classList.remove("hide");
    $("#tt-nh").textContent = T.nganHang || ""; $("#tt-stk").textContent = T.stk; $("#tt-ten").textContent = T.chuTK || ""; $("#tt-luuy").textContent = T.luuY || "";
    if (T.qr) $("#tt-qr").src = T.qr; else $("#tt-qr").parentNode.classList.add("hide");
    document.addEventListener("click", function (e) { if (e.target.closest("[data-qr]")) { if ($("#dlg-mua").open) dong($("#dlg-mua")); mo($("#dlg-tt")); } });
    $("#tt-chep").addEventListener("click", function () {
      var b = this, ok = function () { b.textContent = "Đã sao chép ✓"; setTimeout(function () { b.textContent = "Sao chép số tài khoản"; }, 2000); };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(T.stk).then(ok, function () { b.textContent = "Hãy chép: " + T.stk; });
      else b.textContent = "Hãy chép: " + T.stk;
    });
  }

  /* ---- Hỗ trợ ---- */
  var H = C.hoTroSauMua;
  $("#ho-tro-list").innerHTML = [["Kênh hỗ trợ", H.kenhHoTro], ["Giờ làm việc", H.gioLamViec], ["Thời gian phản hồi dự kiến", H.thoiGianPhanHoi], ["Điều kiện xử lý lỗi", H.dieuKienXuLyLoi], ["Chính sách đổi hoặc hoàn tiền", H.chinhSachDoiHoan]].map(function (r) {
    return '<div class="card"><h3>' + r[0] + '</h3><p class="mu">' + val(r[1]) + "</p></div>";
  }).join("");

  /* ---- FAQ ---- */
  $("#faq-list").innerHTML = C.faq.map(function (f) {
    return "<details><summary>" + esc(f.h) + "</summary><p>" + val(f.d, CHO + ". Vui lòng liên hệ tư vấn.") + "</p></details>";
  }).join("");

  /* ---- Menu điện thoại ---- */
  var bg = $("#burger"), mm = $("#mmenu");
  bg.addEventListener("click", function () { var o = mm.classList.toggle("open"); bg.setAttribute("aria-expanded", o); bg.textContent = o ? "✕" : "☰"; });
  $$("#mmenu a").forEach(function (a) { a.addEventListener("click", function () { mm.classList.remove("open"); bg.textContent = "☰"; bg.setAttribute("aria-expanded", "false"); }); });

  /* ---- Hộp thoại ---- */
  function mo(d) { if (d.showModal) d.showModal(); else d.setAttribute("open", ""); }
  function dong(d) { if (d.close) d.close(); else d.removeAttribute("open"); }
  $$("dialog").forEach(function (d) {
    d.addEventListener("click", function (e) { if (e.target === d) dong(d); });
    $$("[data-dong]", d).forEach(function (b) { b.addEventListener("click", function () { dong(d); }); });
  });

  function info(tieu, html) { $("#info-t").textContent = tieu; $("#info-b").innerHTML = html; if (!$("#dlg-info").open) mo($("#dlg-info")); }
  var CS = { dieuKhoan: "Điều khoản dịch vụ", baoMat: "Chính sách bảo mật", doiHoan: "Chính sách đổi/hoàn tiền" };
  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-cs]");
    if (t) { var k = t.getAttribute("data-cs"), tx = C.chinhSach[k]; info(CS[k], '<p class="legal">' + (tx && tx.trim() ? esc(tx) : '<span class="pend">' + CHO + ". Người bán sẽ bổ sung nội dung này.</span>") + "</p>"); return; }
    var c = e.target.closest("[data-ct]");
    if (c) {
      var i = +c.getAttribute("data-ct"), g = C.goi[i];
      info(tenGoi(g, i), '<dl style="margin:12px 0"><div><b>Giá:</b> ' + gia(g) + "</div><div><b>Thời hạn:</b> " + val(g.thoiHan) + "</div><div><b>Hình thức cung cấp:</b> " + val(g.hinhThuc) + "</div><div><b>Quyền lợi:</b> " + (g.quyenLoi && g.quyenLoi.length ? "<ul>" + g.quyenLoi.map(function (q) { return "<li>" + esc(q) + "</li>"; }).join("") + "</ul>" : val("")) + "</div><div><b>Giới hạn và điều kiện:</b> " + val(g.gioiHan) + "</div><div><b>Bàn giao dự kiến:</b> " + val(g.thoiGianBanGiao) + "</div><div><b>Phạm vi hỗ trợ:</b> " + val(g.hoTro) + '</div></dl><button class="btn btn-y" data-mua="' + i + '" style="width:100%">Đăng ký mua</button>');
      return;
    }
    var m = e.target.closest("[data-mua]");
    if (m) { if ($("#dlg-info").open) dong($("#dlg-info")); moForm(m.getAttribute("data-mua")); return; }
    var n = e.target.closest("[data-nc]");
    if (n) { e.preventDefault(); moForm("", "Nhu cầu: " + C.nhuCau[+n.getAttribute("data-nc")].tieuDe); return; }
    var z = e.target.closest("a[data-zalo]");
    if (z && !zalo) { e.preventDefault(); moForm(""); }
  });

  /* ---- Biểu mẫu ---- */
  var sel = $("#f-goi");
  sel.innerHTML = '<option value="">Cần tư vấn (chưa chọn gói)</option>' + C.goi.map(function (g, i) { return '<option value="' + i + '">' + esc(tenGoi(g, i)) + "</option>"; }).join("");
  var form = $("#form"), tomtat = $("#tomtat"), dl = $("#dlg-mua");
  function moForm(i, ghichu) {
    sel.value = i === "" || i == null ? "" : String(i);
    if (ghichu && !$("#f-ghichu").value) $("#f-ghichu").value = ghichu;
    form.classList.remove("hide"); tomtat.classList.add("hide"); $("#ketqua").innerHTML = "";
    $("#mua-t").textContent = sel.value === "" ? "Gửi yêu cầu tư vấn" : "Đăng ký mua";
    mo(dl);
  }
  function dat(k, msg) { var el = $('[data-er="' + k + '"]'); el.textContent = msg || ""; var inp = { ten: "#f-ten", sdt: "#f-sdt", mail: "#f-mail", dy: "#f-dy" }[k]; $(inp).classList.toggle("bad", !!msg); $(inp).setAttribute("aria-invalid", !!msg); }
  function kiemTra() {
    var ten = $("#f-ten").value.trim(), sdt = $("#f-sdt").value.replace(/[\s.\-]/g, ""), mail = $("#f-mail").value.trim(), ok = true;
    dat("ten", ten.length < 2 ? (ok = false, "Vui lòng nhập họ tên (ít nhất 2 ký tự).") : "");
    dat("sdt", !/^(\+?84|0)\d{9}$/.test(sdt) ? (ok = false, "Số điện thoại không hợp lệ. Ví dụ: 0912345678.") : "");
    dat("mail", !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(mail) ? (ok = false, "Email chưa đúng. Ví dụ: tenban@gmail.com.") : "");
    dat("dy", !$("#f-dy").checked ? (ok = false, "Vui lòng đồng ý với điều khoản và chính sách bảo mật.") : "");
    return ok;
  }
  function duLieu() {
    var i = sel.value;
    return { goi: i === "" ? "Cần tư vấn (chưa chọn gói)" : tenGoi(C.goi[+i], +i), ten: $("#f-ten").value.trim(), lienHe: $("#f-sdt").value.trim(), email: $("#f-mail").value.trim(), ghiChu: $("#f-ghichu").value.trim() || "(không có)", trangThai: "Chờ tư vấn/xác nhận" };
  }
  function noiDung(d) {
    return "YÊU CẦU TỪ WEBSITE DUY ANH AI\nGói: " + d.goi + "\nHọ tên: " + d.ten + "\nSĐT/Zalo: " + d.lienHe + "\nEmail: " + d.email + "\nGhi chú: " + d.ghiChu + "\nTrạng thái: " + d.trangThai;
  }
  var coLuu = !!(C.luuDonUrl && C.luuDonUrl.trim());
  $("#gui").textContent = coLuu ? "Gửi yêu cầu" : "Sao chép & mở Zalo";
  ["#f-ten", "#f-sdt", "#f-mail"].forEach(function (s) { $(s).addEventListener("input", function () { $(s).classList.remove("bad"); }); });
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!kiemTra()) { var b = $(".bad", form); if (b) b.focus(); return; }
    var d = duLieu();
    $("#sum").innerHTML = [["Gói", d.goi], ["Họ tên", d.ten], ["SĐT/Zalo", d.lienHe], ["Email", d.email], ["Ghi chú", d.ghiChu]].map(function (r) { return "<div><b>" + r[0] + ":</b> " + esc(r[1]) + "</div>"; }).join("");
    $("#ketqua").innerHTML = ""; $("#gui").disabled = false;
    form.classList.add("hide"); tomtat.classList.remove("hide");
  });
  $("#sua").addEventListener("click", function () { tomtat.classList.add("hide"); form.classList.remove("hide"); });
  $("#gui").addEventListener("click", function () {
    var d = duLieu(), kq = $("#ketqua"), nut = $("#gui");
    if (coLuu) {
      nut.disabled = true; nut.textContent = "Đang gửi...";
      fetch(C.luuDonUrl, { method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(d) })
        .then(function (r) { if (!r.ok) throw new Error("http"); kq.innerHTML = '<div class="ok">✅ Đã lưu yêu cầu của bạn (trạng thái: Chờ tư vấn/xác nhận). DUY ANH AI sẽ liên hệ lại.</div>'; nut.classList.add("hide"); $("#sua").classList.add("hide"); })
        .catch(function () { kq.innerHTML = '<p class="er">Chưa lưu được yêu cầu. Vui lòng thử lại hoặc liên hệ Zalo của cửa hàng.</p>'; nut.disabled = false; nut.textContent = "Thử gửi lại"; });
      return;
    }
    var tx = noiDung(d);
    function hien(daChep) {
      kq.innerHTML = '<div class="ok">' + (daChep ? "Đã sao chép nội dung. " : "Chưa sao chép tự động — hãy chép nội dung bên dưới. ") + (zalo ? "Hãy dán vào Zalo của cửa hàng để gửi." : "Kênh Zalo của cửa hàng chưa được cập nhật nên chưa thể mở tự động.") + ' <b>Yêu cầu CHƯA được gửi đi cho đến khi bạn gửi tin nhắn.</b></div><textarea rows="7" readonly style="margin-top:10px" aria-label="Nội dung yêu cầu">' + esc(tx) + "</textarea>";
      if (zalo) window.open(zalo, "_blank", "noopener");
    }
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(tx).then(function () { hien(true); }, function () { hien(false); });
    else hien(false);
  });
})();

/* ---- Nhạc nền (tự tạo bằng Web Audio, không dùng file có bản quyền) ----
   Kiểu nhạc chọn trong du-lieu.js: nhac.kieu = "gap" (nhịp nhanh, sôi động, thúc giục) hoặc "thien" (thiền, êm).
   Cố gắng tự phát khi mở trang. Trình duyệt chặn tiếng nếu khách chưa chạm vào trang,
   nên nếu bị chặn, nhạc tự phát ngay ở lần chạm/cuộn/bấm phím đầu tiên của khách. */
(function () {
  "use strict";
  var M = (window.CAU_HINH && window.CAU_HINH.nhac) || {};
  if (M.bat === false) return;
  var AC = window.AudioContext || window.webkitAudioContext;
  if (!AC && !M.tepNhac) return;
  var GAP = M.kieu !== "thien";

  var btn = document.createElement("button");
  btn.type = "button"; btn.className = "nhac";
  function nhan(o) {
    btn.innerHTML = (o ? "🔊" : "🔇") + "<span>" + (o ? "Tắt nhạc" : "Bật nhạc") + "</span>";
    btn.setAttribute("aria-pressed", o ? "true" : "false");
    btn.setAttribute("aria-label", o ? "Tắt nhạc nền" : "Bật nhạc nền");
  }
  nhan(false); document.body.appendChild(btn);

  var on = false, want = true, ctx, master, timer, audio, idx = 0, noise;
  var BPM = 132, BEAT = 60 / BPM, B = GAP ? BEAT * 4 : 8;
  // Kiểu thiền
  var CH_T = [[146.83, 220.0, 329.63, 440.0], [123.47, 185.0, 293.66, 440.0], [196.0, 293.66, 440.0, 493.88], [146.83, 220.0, 293.66, 369.99]];
  var BOWL = [293.66, 369.99, 440.0, 587.33, 739.99];
  // Kiểu gấp: Am - F - C - G, rồi lên cao dần
  var BASS = [55.0, 43.65, 65.41, 49.0];
  var ARP = [[220.0, 261.63, 329.63, 440.0], [174.61, 220.0, 261.63, 349.23], [261.63, 329.63, 392.0, 523.25], [196.0, 246.94, 293.66, 392.0]];

  function reverb(sec, pow) {
    var len = ctx.sampleRate * sec, buf = ctx.createBuffer(2, len, ctx.sampleRate);
    for (var c = 0; c < 2; c++) { var d = buf.getChannelData(c); for (var i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, pow); }
    var cv = ctx.createConvolver(); cv.buffer = buf; return cv;
  }
  function build() {
    ctx = new AC(); master = ctx.createGain(); master.gain.value = 0;
    var lp = ctx.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = GAP ? 3800 : 1900;
    var dry = ctx.createGain(); dry.gain.value = 0.8; var wet = ctx.createGain(); wet.gain.value = GAP ? 0.18 : 0.55; var rv = GAP ? reverb(1.2, 3) : reverb(3.2, 2.6);
    master.connect(lp); lp.connect(dry); lp.connect(rv); rv.connect(wet); dry.connect(ctx.destination); wet.connect(ctx.destination);
    if (GAP) {
      var n = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate), d = n.getChannelData(0);
      for (var i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
      noise = n;
    } else {
      [[73.42, 0.07], [110.0, 0.045], [146.83, 0.025]].forEach(function (p) {
        var o = ctx.createOscillator(), g = ctx.createGain(), l = ctx.createOscillator(), lg = ctx.createGain();
        o.type = "sine"; o.frequency.value = p[0]; g.gain.value = p[1];
        l.frequency.value = 0.07 + Math.random() * 0.05; lg.gain.value = p[1] * 0.5; l.connect(lg); lg.connect(g.gain);
        o.connect(g); g.connect(master); o.start(); l.start();
      });
    }
  }
  // ---- kiểu thiền ----
  function pad(t) {
    CH_T[idx % 4].forEach(function (f, k) {
      var o = ctx.createOscillator(), g = ctx.createGain();
      o.type = "sine"; o.frequency.value = f; o.detune.value = (k - 1.5) * 5;
      g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(0.035, t + 3.2); g.gain.linearRampToValueAtTime(0.0001, t + B + 3);
      o.connect(g); g.connect(master); o.start(t); o.stop(t + B + 3.2);
    });
  }
  function bowl(f, t) {
    [[1, 0.05], [2.76, 0.018], [5.4, 0.008]].forEach(function (p) {
      [-1.4, 1.4].forEach(function (de) {
        var o = ctx.createOscillator(), g = ctx.createGain();
        o.type = "sine"; o.frequency.value = f * p[0] + de;
        g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(p[1], t + 0.04); g.gain.exponentialRampToValueAtTime(0.0001, t + 9);
        o.connect(g); g.connect(master); o.start(t); o.stop(t + 9.2);
      });
    });
  }
  // ---- kiểu gấp (nhịp nhanh, sôi động) ----
  function kick(t) {
    var o = ctx.createOscillator(), g = ctx.createGain();
    o.type = "sine"; o.frequency.setValueAtTime(150, t); o.frequency.exponentialRampToValueAtTime(45, t + 0.12);
    g.gain.setValueAtTime(0.5, t); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.22);
    o.connect(g); g.connect(master); o.start(t); o.stop(t + 0.25);
  }
  function hat(t, v) {
    var s = ctx.createBufferSource(), g = ctx.createGain(), hp = ctx.createBiquadFilter();
    s.buffer = noise; hp.type = "highpass"; hp.frequency.value = 7000;
    g.gain.setValueAtTime(v, t); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.05);
    s.connect(hp); hp.connect(g); g.connect(master); s.start(t); s.stop(t + 0.06);
  }
  function pluck(f, t, v) {
    var o = ctx.createOscillator(), g = ctx.createGain();
    o.type = "triangle"; o.frequency.value = f;
    g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(v, t + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, t + BEAT * 0.9);
    o.connect(g); g.connect(master); o.start(t); o.stop(t + BEAT);
  }
  function bass(f, t) {
    var o = ctx.createOscillator(), g = ctx.createGain();
    o.type = "sawtooth"; o.frequency.value = f * 2;
    var lp = ctx.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 400;
    g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(0.1, t + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, t + BEAT * 0.45);
    o.connect(lp); lp.connect(g); g.connect(master); o.start(t); o.stop(t + BEAT * 0.5);
  }
  function barGap(t) {
    var c = idx % 4, lift = Math.floor(idx / 4) % 2 ? 2 : 1; // 4 ô nhịp đầu thấp, 4 ô sau cao hơn một quãng tám (tăng dần cảm giác dồn dập)
    for (var b = 0; b < 4; b++) {
      var tb = t + b * BEAT;
      kick(tb); hat(tb + BEAT / 2, 0.06); bass(BASS[c], tb + BEAT / 2);
      if (b === 3) { hat(tb + BEAT * 0.75, 0.05); hat(tb + BEAT * 0.25, 0.04); }
    }
    for (var i = 0; i < 8; i++) { var f = ARP[c][[0, 1, 2, 3, 2, 1, 2, 3][i]] * lift; pluck(f, t + i * BEAT / 2, 0.06); }
  }
  function bar() {
    var t = ctx.currentTime + 0.06;
    if (GAP) barGap(t); else { pad(t); bowl(BOWL[Math.floor(Math.random() * BOWL.length)], t + 0.6); if (Math.random() < 0.8) bowl(BOWL[Math.floor(Math.random() * BOWL.length)], t + 4.6); }
    idx++;
  }
  function batDau() {
    if (on || !want) return;
    if (M.tepNhac) {
      audio = audio || Object.assign(new Audio(M.tepNhac), { loop: true, volume: 0.35 });
      audio.play().then(function () { on = true; nhan(true); }).catch(function () {});
      return;
    }
    if (!ctx) build();
    var ok = function () {
      if (ctx.state !== "running" || on || !want) return;
      on = true; nhan(true);
      master.gain.cancelScheduledValues(ctx.currentTime); master.gain.setValueAtTime(master.gain.value, ctx.currentTime); master.gain.linearRampToValueAtTime(GAP ? 0.7 : 1, ctx.currentTime + (GAP ? 1 : 3));
      bar(); timer = setInterval(bar, B * 1000);
    };
    var p = ctx.resume(); if (p && p.then) p.then(ok, function () {}); else ok();
  }
  function dung() {
    on = false; clearInterval(timer);
    if (audio) audio.pause();
    if (ctx) { master.gain.cancelScheduledValues(ctx.currentTime); master.gain.setValueAtTime(master.gain.value, ctx.currentTime); master.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.6); setTimeout(function () { if (!on) ctx.suspend(); }, 800); }
    nhan(false);
  }

  btn.addEventListener("click", function () { if (on) { want = false; dung(); } else { want = true; batDau(); } });

  var gestures = ["pointerdown", "touchend", "keydown", "click", "wheel"];
  function onGesture(e) {
    if (e.target && e.target.closest && e.target.closest(".nhac")) return;
    batDau();
    if (on) gestures.forEach(function (g) { document.removeEventListener(g, onGesture, true); });
  }
  gestures.forEach(function (g) { document.addEventListener(g, onGesture, true); });
  document.addEventListener("visibilitychange", function () { if (document.hidden) { if (on) dung(); } else batDau(); });
  batDau();
})();
