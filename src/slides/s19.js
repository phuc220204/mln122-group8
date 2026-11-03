import { kicker } from './_kit.js';
import { credits } from '../content/credits.js';

const groups = [
  ['Giáo trình, kinh điển, văn kiện', [
    'Bộ Giáo dục và Đào tạo. (2019). <i>Giáo trình Kinh tế chính trị Mác – Lênin</i> (Dành cho bậc đại học – không chuyên lý luận chính trị). (Ch.2 mục 2.3, tr.48–51; Ch.5 mục 5.3, tr.123–137).',
    'C.Mác &amp; Ph.Ăngghen. (1995a). <i>Toàn tập</i> (T.8). Nxb Chính trị quốc gia.',
    'C.Mác &amp; Ph.Ăngghen. (1995b). <i>Toàn tập</i> (T.18). Nxb Chính trị quốc gia.',
    'Ban Chấp hành Trung ương Đảng Cộng sản Việt Nam. (2016). <i>Nghị quyết số 04-NQ/TW ngày 30/10/2016 Hội nghị lần thứ tư Ban Chấp hành Trung ương khóa XII về tăng cường xây dựng, chỉnh đốn Đảng…</i>',
    'Bộ Chính trị. (2025). <i>Nghị quyết số 68-NQ/TW ngày 04/5/2025 về phát triển kinh tế tư nhân</i>.',
  ]],
  ['Văn bản pháp luật', [
    'Quốc hội. (2025a). <i>Nghị quyết số 198/2025/QH15 ngày 17/5/2025 về một số cơ chế, chính sách đặc biệt phát triển kinh tế tư nhân</i>.',
    'Quốc hội. (2025b). <i>Luật Quản lý thuế số 108/2025/QH15 ngày 10/12/2025</i>.',
    'Quốc hội. (2026a). <i>Luật sửa đổi, bổ sung một số điều của Luật Thuế thu nhập cá nhân, Luật Thuế giá trị gia tăng, Luật Thuế thu nhập doanh nghiệp và Luật Thuế tiêu thụ đặc biệt</i> (thông qua ngày 24/4/2026).',
    'Quốc hội. (2026b). <i>Nghị quyết số 43/2026/QH16 về giảm thuế thu nhập cá nhân, thuế thu nhập doanh nghiệp đối với cá nhân và doanh nghiệp</i> (thông qua ngày 24/8/2026).',
    'Chính phủ. (2026a). <i>Nghị định số 68/2026/NĐ-CP ngày 05/3/2026 quy định về chính sách thuế và quản lý thuế đối với hộ kinh doanh, cá nhân kinh doanh</i>.',
    'Chính phủ. (2026b). <i>Nghị định số 141/2026/NĐ-CP ngày 29/4/2026 sửa đổi, bổ sung một số điều của Nghị định số 68/2026/NĐ-CP và Nghị định số 320/2025/NĐ-CP</i>.',
    'Chính phủ. (2026c). <i>Nghị định số 252/2026/NĐ-CP</i> (quy định trách nhiệm khấu trừ, khai thay, nộp thay của chủ quản nền tảng thương mại điện tử; hiệu lực 01/7/2026).',
  ]],
  ['Số liệu, thông tin công bố chính thức', [
    ['Tạp chí Kinh tế – Tài chính. (2026a, 07/10). <i>Hơn 3,53 triệu hộ, cá nhân kinh doanh đã đăng ký thuế</i>.', 'https://thuehaiquan.tapchikinhtetaichinh.vn/hon-3-53-trieu-ho-ca-nhan-kinh-doanh-da-dang-ky-thue-168873.html'],
    ['Tạp chí Kinh tế – Tài chính. (2026b, 17/6). <i>98% hộ kinh doanh trong diện triển khai đã thực hiện kê khai thuế</i>.', 'https://thuehaiquan.tapchikinhtetaichinh.vn/98-ho-kinh-doanh-trong-dien-trien-khai-da-thuc-hien-ke-khai-thue-159190.html'],
    ['Tạp chí Kinh tế – Tài chính. (2026c, 24/8). <i>Chính thức giảm 30% thuế thu nhập cho cá nhân, hộ kinh doanh, doanh nghiệp doanh thu không quá 10 tỷ đồng</i>.', 'https://thuehaiquan.tapchikinhtetaichinh.vn/chinh-thuc-giam-30-thue-thu-nhap-cho-ca-nhan-ho-kinh-doanh-doanh-nghiep-doanh-thu-khong-qua-10-ty-dong-165295.html'],
    ['Báo Đại biểu Nhân dân. (2026, 15/5). <i>Luật sửa đổi, bổ sung một số điều của 4 Luật về thuế: Bảo đảm công bằng trong chính sách thuế giữa hộ, cá nhân kinh doanh và doanh nghiệp quy mô nhỏ</i>.', 'https://daibieunhandan.vn/luat-sua-doi-bo-sung-mot-so-dieu-cua-4-luat-ve-thue-bao-dam-cong-bang-trong-chinh-sach-thue-giua-ho-ca-nhan-kinh-doanh-va-doanh-nghiep-quy-mo-nho-10417076.html'],
    ['Tuổi Trẻ. (2026, 24/4). <i>Bỏ ngưỡng doanh thu miễn thuế 500 triệu đồng/năm với hộ kinh doanh</i>.', 'https://tuoitre.vn/bo-nguong-doanh-thu-mien-thue-500-trieu-dong-nam-voi-ho-kinh-doanh-20260424095734326.htm'],
    ['Thời báo Tài chính Việt Nam. (2026). <i>Nâng ngưỡng doanh thu không phải nộp thuế lên 1 tỷ đồng: Điều hộ kinh doanh mong chờ đã thành hiện thực</i>.', 'https://thoibaotaichinhvietnam.vn/nang-nguong-doanh-thu-khong-phai-nop-thue-len-1-ty-dong-dieu-ho-kinh-doanh-mong-cho-da-thanh-hien-thuc-196524.html'],
    ['Báo Đấu thầu. (2026, 03/8). <i>Phác họa bức tranh khu vực kinh tế chưa được quan sát</i> (số liệu Cục Thống kê).', 'https://baodauthau.vn/phac-hoa-buc-tranh-khu-vuc-kinh-te-chua-duoc-quan-sat-post204108.html'],
    ['Luật sư Việt Nam. (2026, 09/9). <i>Những thay đổi quan trọng về thuế hộ, cá nhân kinh doanh cần biết</i> (theo Công văn 6436/CT-PC của Cục Thuế).', 'https://lsvn.vn/nhung-thay-doi-quan-trong-ve-thue-ho-ca-nhan-kinh-doanh-can-biet-a178824.html'],
    ['Mekong ASEAN. (2026). <i>Thu gần 224.700 tỷ đồng từ thương mại điện tử và hộ kinh doanh trong 9 tháng</i>.', 'https://mekongasean.vn/thu-gan-224700-ty-dong-tu-thuong-mai-dien-tu-va-ho-kinh-doanh-trong-9-thang-60375.html'],
    ['VietnamPlus. (2025). <i>Bỏ áp dụng thuế khoán: Hộ kinh doanh bước vào cuộc chơi mới</i>.', 'https://www.vietnamplus.vn/bo-ap-dung-thue-khoan-ho-kinh-doanh-buoc-vao-cuoc-choi-moi-post1042297.vnp'],
    ['Vietnamnet. (2020, 26/02). <i>Ép dân chi "bồi dưỡng" hàng trăm triệu, cựu cán bộ thuế lĩnh án</i>.', 'https://vietnamnet.vn/ep-dan-chi-boi-duong-hang-tram-trieu-cuu-can-bo-thue-lanh-an-619377.html'],
  ]],
];

let n = 0;
const item = (it) => {
  n += 1;
  const [text, url] = Array.isArray(it) ? it : [it];
  return `<li><span class="rf-n mono">${n}.</span><p>${text}${url ? ` <a href="${url}" target="_blank" rel="noopener">${url}</a>` : ''}</p></li>`;
};

const creditLine = (c) => `${c.used} – ${c.title} – ${c.author} – ${c.license}${c.url ? ` · <a href="${c.url}" target="_blank" rel="noopener">${c.url}</a>` : ''}`;

export default {
  title: 'Tài liệu tham khảo · APA 7',
  section: 'Tài liệu tham khảo',
  scene: 'refs',
  scrollable: true,
  cls: 'veil-heavy',
  html: `
  ${kicker('19', 'Tài liệu tham khảo · APA 7')}
  <p class="rf-note" data-a>Nguồn chính thống gồm giáo trình, văn kiện Đảng, văn bản pháp luật, cơ quan nhà nước và báo chí thuộc cơ quan nhà nước. Các nhận định "phân tích của nhóm" được ghi rõ trên từng slide. Ảnh nền: tên ảnh – tác giả – giấy phép được ghi ở mục <b class="pos">Nguồn ảnh</b> cuối danh mục.</p>
  <div class="refs" data-scroll data-a="fade">
    ${groups.map(([h, items]) => `<section><h3 class="h-lbl pos-t">${h}</h3><ol>${items.map(item).join('')}</ol></section>`).join('')}
    <section class="rf-img"><h3 class="h-lbl pos-t">Nguồn ảnh</h3><ul>${credits.map((c) => `<li><p>${creditLine(c)}</p></li>`).join('')}</ul></section>
  </div>`,
};
