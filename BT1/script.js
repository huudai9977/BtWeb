var app = angular.module("myApp",[]);
app.controller("myController", function($scope){
  $scope.nhan_vien = {};
  $scope.ds_nv = [
    {
      khoa_dt: "ANGULARJS",
      ma_nv: "NV001",
      ten_nv: "Nguyễn Trần Kim Anh",
      sdt: "0386948334",
      ngay_dg: "2023-02-09",
      tu_ngay: "2023-01-10",
      den_ngay: "2023-04-15",
      bo_phan: "Dự án",
      tong_diem: 10,
      nguoi_hd: "Lê Văn Nam Thành",
    },
    {
      khoa_dt: "HTML_CSS",
      ma_nv: "NV002",
      ten_nv: "Nguyễn Văn B",
      sdt: "0386948876",
      ngay_dg: "2023-02-09",
      tu_ngay: "2023-01-10",
      den_ngay: "2023-04-15",
      bo_phan: "R&D",
      tong_diem: 2,
      nguoi_hd: "Nguyễn Kim Huế",
    },
    {
      khoa_dt: "OTHER",
      ma_nv: "NV003",
      ten_nv: "Nguyễn Văn C",
      sdt: "0386948396",
      ngay_dg: "2023-02-09",
      tu_ngay: "2023-01-10",
      den_ngay: "2023-04-15",
      bo_phan: "R&D",
      tong_diem: 3,
      nguoi_hd: "Nguyễn Kim Huế",
    },
    {
      khoa_dt: "ANGULARJS",
      ma_nv: "NV004",
      ten_nv: "Lê Quang Đạo",
      sdt: "0386948375",
      ngay_dg: "2023-02-09",
      tu_ngay: "2023-01-10",
      den_ngay: "2023-04-15",
      bo_phan: "Dự án",
      tong_diem: 8,
      nguoi_hd: "Lê Văn Nam Thành",
    },
    {
      khoa_dt: "HTML_CSS",
      ma_nv: "NV005",
      ten_nv: "Trần Thái Tông",
      sdt: "0386948399",
      ngay_dg: "2023-02-09",
      tu_ngay: "2023-01-10",
      den_ngay: "2023-04-15",
      bo_phan: "R&D",
      tong_diem: 7,
      nguoi_hd: "Lê Văn Nam Thành",
    },
    {
      khoa_dt: "ANGULARJS",
      ma_nv: "NV006",
      ten_nv: "Nguyễn Văn Nam",
      sdt: "0386948356",
      ngay_dg: "2023-02-09",
      tu_ngay: "2023-01-10",
      den_ngay: "2023-04-15",
      bo_phan: "Dự án",
      tong_diem: 10,
      nguoi_hd: "Nguyễn Kim Huế",
    },
  ];
  $scope.getKhoaDT = function(ma) {
  switch (ma) {
    case "ANGULARJS":
      return "Javascript-Jquery-AngularJS";
    case "HTML_CSS":
      return "HTML_CSS";
    case "OTHER":
      return "Khác";
  }
}
  $scope.getKhoaDT = function (diem) {
  if (diem >= 8.5) return "Tốt";
  if (diem >= 6.5 && diem < 8.5) return "Khá";
  if (diem >= 5 && diem < 6.5) return "Trung bình";
  return "Không xếp loại";
}
$scope.addData = ThemMoi;
function ThemMoi() {
  if (!validate($scope.nhan_vien)) return false;
  // Kiểm tra tồn tại hay chưa
  for (let i = 0; i < $scope.ds_nv.length; i++) {
    if ($scope.ds_nv[i].ma_nv == $scope.nhan_vien.ma_nv) {
      alert("Nhân viên đã tồn tại!");
      return false;
    }
  }
  $scope.ds_nv.push($scope.nhan_vien);
  $scope.nhan_vien = {};
}
function validate(nhanVien) {
  // Kiểm tra khóa đào tạo, mã nhân viên, ngày đánh giá, tên nhân viên không được bỏ trống
  if (!nhanVien.khoa_dt) {
    alert("Không đào tạo không được bỏ trống!");
    return false;
  }
  if (!nhanVien.ma_nv) {
    alert("Mã nhân viên không được bỏ trống!");
    return false;
  }
  if (!nhanVien.ngay_dg) {
    alert("Ngày đánh giá không được bỏ trống!");
    return false;
  }
  if (!nhanVien.ten_nv) {
    alert("Tên nhân viên không được bỏ trống!");
    return false;
  }
  // Kiểm tra định dạng
  if (nhanVien.sdt &&
    !validateSDT(nhanVien.sdt)
  ) {
    alert("Số điện thoại không đúng!");
    return false;
  }
  if (nhanVien.tong_diem != null && nhanVien.tong_diem != "") {
    if (
      isNaN(nhanVien.tong_diem) ||
      nhanVien.tong_diem < 0 ||
      nhanVien.tong_diem > 10
    ) {
      alert("Tổng điểm không hợp lệ!");
      return false;
    }
  }
  if (nhanVien.tu_ngay > nhanVien.den_ngay) {
    alert("Ngày bắt đầu phải nhỏ hơn ngày kết thúc!");
    return false;
  }
  return true;
}

// Hàm Validate số điện thoại
function validateSDT(sdt) {
  var sdtformat = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  return sdt.match(sdtformat);
}
})



// var item_selected = [];

// $(document).ready(function () {
//   // Load dữ liệu lên trang
//   loadData();

//   // Bắt sự kiện nhấn nút add
//   $("#add").click(function () {
//     $("#modal-title").html("Thêm thông tin nhân viên");
//     $("#modal-title").val("ADD");
//     $("#saveAndAdd").show();
//     $("#ma_nv").prop("disabled", false);
//     resetModal();
//   });

//   // Bắt sự kiện nhấn nút sửa
//   $("#edit").click(function () {
//     if (item_selected.length <= 0) {
//       alert("Vui lòng chọn nhân viên muốn sửa!");
//       return false;
//     }
//     if (item_selected.length > 1) {
//       alert("Vui lòng chỉ chọn 1 nhân viên!");
//       return false;
//     }
//     editSelected(item_selected[0]);
//     item_selected = [];
//   });

//   // Bắt sự kiện nhấn nút xóa
//   $("#delete").click(function () {
//     if (item_selected.length <= 0) {
//       alert("Vui lòng chọn nhân viên muốn xóa!");
//       return false;
//     }
//     var check = confirm(
//       "Bạn có chắc chắn muốn xóa những nhân viên đang chọn không?"
//     );
//     if (check) {
//       for (var i = 0; i < item_selected.length; i++) {
//         for (var j = 0; j < ds_nv.length; j++) {
//           if (ds_nv[j].ma_nv == item_selected[i]) {
//             ds_nv.splice(j, 1);
//           }
//         }
//       }
//       item_selected = [];
//       loadData();
//     }
//   });

//   // Bắt sự kiện nhấn nút search
//   $("#btn-search").click(function () {
//     search();
//   });

//   // Bắt sự kiện nhấn phím enter trong ô tìm kiếm
//   $("#text-search").keypress(function (e) {
//     if (e.keyCode == "13") {
//       search();
//     }
//   });

//   // Bắt sự kiện nhấn nút lưu
//   $("#save").click(function () {
//     if ($("#modal-title").val() == "ADD") {
//       if (addData()) {
//         $("#myModal").modal("hide");
//       }
//     } else if ($("#modal-title").val() == "EDIT") {
//       if (editData()) {
//         $("#myModal").modal("hide");
//       }
//     }
//   });

//   // Bắt sự kiện nhấn nút lưu và thêm
//   $("#saveAndAdd").click(function () {
//     if ($("#modal-title").val() == "ADD") {
//       if (addData()) {
//         resetModal();
//       }
//     }
//   });

//   // Binding xếp loại
//   $("#tong_diem").blur(function () {
//     var diem = $("#tong_diem").val();
//     $("#xep_loai").val(getXepLoai(diem));
//   });
// });

// // Hàm bắt sự kiện chọn checkbox
// function clickCheckBox(ma_nv) {
//   var me = document.getElementById(ma_nv);
//   if (me.checked) {
//     item_selected.push(ma_nv);
//     $(me).parents("tr").addClass("item-selected");
//   } else {
//     for (var i = 0; i < item_selected.length; i++) {
//       if (item_selected[i] == ma_nv) {
//         item_selected.splice(i, 1);
//       }
//     }
//     $(me).parents("tr").removeClass("item-selected");
//   }
// }

// // Hàm hiển thị dữ liệu
// function loadData() {
//   // Hiển thị tổng số bản ghi
//   document.getElementById("total-record").innerHTML = ds_nv.length;

//   // Hiển thị danh sách nhân viên
//   var hien_thi = "";
//   hien_thi += getDataTable(ds_nv);
//   document.getElementById("ds_nv").innerHTML = hien_thi;
// }

// // Hàm format dữ liệu ngày tháng hiển thị trên table
// function formatDate(input) {
//   if (!input) return "";
//   try {
//     date = new Date(input);
//     // Lấy ngày
//     var day = date.getDate();
//     day = day < 10 ? `0${day}` : day;
//     // Lấy tháng
//     var month = date.getMonth() + 1;
//     month = month < 10 ? `0${month}` : month;
//     // Lấy năm
//     var year = date.getFullYear();
//     return `${day}/${month}/${year}`;
//   } catch (error) {
//     console.log(error);
//     return "";
//   }
// }

// // Hàm trả về dữ liệu ngày tháng theo định dang yyyy-mm-dd
// function getValueDate(input) {
//   if (!input) return "";
//   try {
//     date = new Date(input);
//     // Lấy ngày
//     var day = date.getDate();
//     day = day < 10 ? `0${day}` : day;
//     // Lấy tháng
//     var month = date.getMonth() + 1;
//     month = month < 10 ? `0${month}` : month;
//     // Lấy năm
//     var year = date.getFullYear();
//     return `${year}-${month}-${day}`;
//   } catch (error) {
//     console.log(error);
//     return "";
//   }
// }

// // Hàm reset form trên modal
// function resetModal() {
//   $("#khoa_dt").val("");
//   $("#ma_nv").val("");
//   $("#ngay_dg").val("");
//   $("#tu_ngay").val("");
//   $("#ten_nv").val("");
//   $("#sdt").val("");
//   $("#den_ngay").val("");
//   $("#bo_phan").val("");
//   $("#tong_diem").val("");
//   $("#nguoi_hd").val("");
//   $("#xep_loai").val("");
// }

// // Hàm thêm nhân viên


// // Hàm sửa thông tin nhân viên
// function editData() {
//   var khoaDT = $("#khoa_dt").val();
//   var maNV = $("#ma_nv").val().trim();
//   var ngayDG = $("#ngay_dg").val();
//   var tuNgay = $("#tu_ngay").val();
//   var tenNV = $("#ten_nv").val().trim();
//   var dienThoai = $("#sdt").val().trim();
//   var denNgay = $("#den_ngay").val();
//   var boPhan = $("#bo_phan").val();
//   var tongDiem = parseFloat($("#tong_diem").val().trim());
//   var nguoiHD = $("#nguoi_hd").val().trim();
//   var new_nv = {
//     khoa_dt: khoaDT,
//     ma_nv: maNV,
//     ngay_dg: ngayDG,
//     tu_ngay: tuNgay,
//     ten_nv: tenNV,
//     sdt: dienThoai,
//     den_ngay: denNgay,
//     bo_phan: boPhan,
//     tong_diem: tongDiem,
//     nguoi_hd: nguoiHD,
//   };
//   if (!validate(new_nv)) return false;
//   for (var i = 0; i < ds_nv.length; i++) {
//     if (ds_nv[i].ma_nv == new_nv.ma_nv) {
//       ds_nv[i] = new_nv;
//     }
//   }
//   loadData();
//   return true;
// }

// // Hàm validate dữ liệu
// function validate(nhanVien) {
//   // Kiểm tra khóa đào tạo, mã nhân viên, ngày đánh giá, tên nhân viên không được bỏ trống
//   if (!nhanVien.khoa_dt) {
//     alert("Không đào tạo không được bỏ trống!");
//     return false;
//   }
//   if (!nhanVien.ma_nv) {
//     alert("Mã nhân viên không được bỏ trống!");
//     return false;
//   }
//   if (!nhanVien.ngay_dg) {
//     alert("Ngày đánh giá không được bỏ trống!");
//     return false;
//   }
//   if (!nhanVien.ten_nv) {
//     alert("Tên nhân viên không được bỏ trống!");
//     return false;
//   }
//   // Kiểm tra định dạng
//   if (
//     nhanVien.sdt != null &&
//     nhanVien.sdt != "" &&
//     !validateSDT(nhanVien.sdt)
//   ) {
//     alert("Số điện thoại không đúng!");
//     return false;
//   }
//   if (nhanVien.tong_diem != null && nhanVien.tong_diem != "") {
//     if (
//       isNaN(nhanVien.tong_diem) ||
//       nhanVien.tong_diem < 0 ||
//       nhanVien.tong_diem > 10
//     ) {
//       alert("Tổng điểm không hợp lệ!");
//       return false;
//     }
//   }
//   if (nhanVien.tu_ngay > nhanVien.den_ngay) {
//     alert("Ngày bắt đầu phải nhỏ hơn ngày kết thúc!");
//     return false;
//   }
//   return true;
// }

// // Hàm Validate số điện thoại
// function validateSDT(sdt) {
//   var sdtformat = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
//   return sdt.match(sdtformat);
// }

// // Hàm xử lí khi chọn tính năng sửa nhân viên
// function editSelected(ma_nv) {
//   $("#myModal").modal("show");
//   $("#modal-title").html("Cập nhật kết quả đánh giá nhân viên");
//   $("#modal-title").val("EDIT");
//   $("#saveAndAdd").hide();
//   $("#ma_nv").prop("disabled", true);
//   var nvSelected;
//   for (var i = 0; i < ds_nv.length; i++) {
//     if (ds_nv[i].ma_nv == ma_nv) {
//       nvSelected = ds_nv[i];
//       break;
//     }
//   }
//   $("#khoa_dt").val(nvSelected.khoa_dt);
//   $("#ma_nv").val(nvSelected.ma_nv);
//   $("#ngay_dg").val(getValueDate(nvSelected.ngay_dg));
//   $("#tu_ngay").val(getValueDate(nvSelected.tu_ngay));
//   $("#ten_nv").val(nvSelected.ten_nv);
//   $("#sdt").val(nvSelected.sdt);
//   $("#den_ngay").val(getValueDate(nvSelected.den_ngay));
//   $("#bo_phan").val(nvSelected.bo_phan);
//   $("#tong_diem").val(nvSelected.tong_diem);
//   $("#nguoi_hd").val(nvSelected.nguoi_hd);
//   $("#xep_loai").val(getXepLoai(nvSelected.tong_diem));
// }

// // Hàm xóa thông tin nhân viên
// function deleteData(ma_nv) {
//   var check = confirm(
//     "Bạn có chắc chắn muốn xóa nhân viên " + ma_nv + " này không?"
//   );
//   if (check) {
//     for (var i = 0; i < ds_nv.length; i++) {
//       if (ds_nv[i].ma_nv == ma_nv) {
//         ds_nv.splice(i, 1);
//       }
//     }
//     loadData();
//   }
// }

// // Hàm tìm kiếm thông tin nhân viên
// function search() {
//   var key = $("#text-search").val().trim().toLowerCase();
//   if (!key) {
//     loadData();
//   } else {
//     var ds_search = [];
//     for (var i = 0; i < ds_nv.length; i++) {
//       if (
//         ds_nv[i].khoa_dt.toLowerCase().indexOf(key) != -1 ||
//         ds_nv[i].bo_phan.toLowerCase().indexOf(key) != -1 ||
//         ds_nv[i].nguoi_hd.toLowerCase().indexOf(key) != -1 ||
//         ds_nv[i].ten_nv.toLowerCase().indexOf(key) != -1
//       ) {
//         ds_search.push(ds_nv[i]);
//       }
//     }
//     $("#total-record").html(ds_search.length);
//     $("#ds_nv").html("");
//     $("#ds_nv").append(getDataTable(ds_search));
//   }
// }

// function getKhoaDT(ma) {
//   switch (ma) {
//     case "ANGULARJS":
//       return "Javascript-Jquery-AngularJS";
//     case "HTML_CSS":
//       return "HTML_CSS";
//     case "OTHER":
//       return "Khác";
//   }
// }

// function getXepLoai(diem) {
//   if (diem >= 8.5) return "Tốt";
//   if (diem >= 6.5 && diem < 8.5) return "Khá";
//   if (diem >= 5 && diem < 6.5) return "Trung bình";
//   return "Không xếp loại";
// }

// // Hàm trả về dữ liệu bảng danh sách kế hoạch
// function getDataTable(danh_sach) {
//   var result = "";
//   for (var i = 0; i < danh_sach.length; i++) {
//     result +=
//       "<tr ondblclick = 'editSelected(&#39" +
//       danh_sach[i].ma_nv +
//       "&#39)'><td class='center'>" +
//       (i + 1) +
//       "<td class='center'><input type='checkbox' id='" +
//       danh_sach[i].ma_nv +
//       "' onclick='clickCheckBox(&#39" +
//       danh_sach[i].ma_nv +
//       "&#39)'/></td><td class='center'><button type='button' class='fa fa-pencil color-blue' onclick='editSelected(&#39" +
//       danh_sach[i].ma_nv +
//       "&#39)'></button>" +
//       "</td><td class='center'><button type='button' class='fa fa-trash-o color-red' onclick='deleteData(&#39" +
//       danh_sach[i].ma_nv +
//       "&#39)'></button></td><td>" +
//       danh_sach[i].khoa_dt +
//       "</td><td>" +
//       getKhoaDT(danh_sach[i].khoa_dt) +
//       "</td><td>" +
//       danh_sach[i].ten_nv +
//       "</td><td>" +
//       danh_sach[i].bo_phan +
//       "</td><td>" +
//       formatDate(danh_sach[i].ngay_dg) +
//       "</td><td>" +
//       danh_sach[i].nguoi_hd +
//       "</td><td>" +
//       parseFloat(danh_sach[i].tong_diem).toFixed(2) +
//       "</td><td>" +
//       getXepLoai(danh_sach[i].tong_diem) +
//       "</td></tr>";
//   }
//   return result;
// }
