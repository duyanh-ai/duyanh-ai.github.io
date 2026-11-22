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
    return '<article class="card"><h3>' + esc(tenGoi(g, i)) + '</h3><div class="price' + (g.gia && !hetUD() ? "" : " pend") + '">' + gia(g) + (g.gia && !hetUD() ? ' <small style="font-size:.8rem;font-weight:500">VNĐ</small>' : "") + "</div>" +
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
    if (T.qr) $("#tt-qr").src = T.qr; else $("#tt-qr").classList.add("hide");
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
