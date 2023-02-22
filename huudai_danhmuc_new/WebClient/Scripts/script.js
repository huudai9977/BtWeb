var app = angular.module("myApp", []);
app.controller("myController", function ($scope, $http) {
    //#region khai báo
    $scope.ds_loaiban = [
        { ma_loai_ban: '', ten_loai_ban: 'Tất cả' },
        { ma_loai_ban: '1', ten_loai_ban: 'Bán buôn' },
        { ma_loai_ban: '2', ten_loai_ban: 'Bán lẻ' }
    ];

    $scope.ds_loaibanggia = [
        { ma_loai_bang_gia: '', ten_loai_bang_gia: 'Tất cả' },
       { ma_loai_bang_gia: '1', ten_loai_bang_gia: 'Bảng giá chuẩn' },
       { ma_loai_bang_gia: '2', ten_loai_bang_gia: 'Bảng giá ngày' },
       { ma_loai_bang_gia: '3', ten_loai_bang_gia: 'Bảng giá giờ vàng' },
    ];

    $scope.ds_thue = [
      { ma_thue: '00', ten_thue: 'Không áp dụng thuế', thue_suat: 0 },
      { ma_thue: '10', ten_thue: 'Thuế GTGT 10%', thue_suat: 10 },
      { ma_thue: '20', ten_thue: 'Thuế GTGT 20%', thue_suat: 20 },
      { ma_thue: '30', ten_thue: 'Thuế GTGT 30%', thue_suat: 20 },
      { ma_thue: '50', ten_thue: 'Thuế GTGT 50%', thue_suat: 50 },
    ];

    $scope.ds_loaiad = [
         { ma_loai_ad: '0', ten_loai_ad: 'Tất cả' },
      { ma_loai_ad: '1', ten_loai_ad: 'Khách hàng' },
      { ma_loai_ad: '2', ten_loai_ad: 'Nhóm khách hàng' },
    ];

    $scope.ds_status = [
        { status: '', statusname: 'Tất cả' },
        { status: '1', statusname: 'Sử dụng' },
       { status: '0', statusname: 'Không sử dụng' }
    ];

    $scope.seachDynamic = {
        keyword: '',
        loaiban: $scope.ds_loaiban[0],
        loaibanggia: $scope.ds_loaibanggia[0],
        trangthai: $scope.ds_status[0]
    };

    $scope.ds_banggia = [
        {
            oid: 1,
            ma_bang_gia: 'BB2021',
            ten_bang_gia: 'Bảng giá chuẩn 2021',
            ma_loai_ban: '1',
            ten_loai_ban: 'Bán buôn',
            ma_loai_bang_gia: '1',
            ten_loai_bang_gia: 'Bảng giá chuẩn',
            status: 1,
            statusname: 'Sử dụng',
            ds_vattu: [
                {
                    oid: 1,
                    ma_vt: 'CT01',
                    ten_vt: 'Chuyên cần',
                    ma_loai_ad: '1',
                    ten_loai_ad: 'Khách hàng',
                    nh_kh: '',
                    ma_kh: '',
                    tu_ngay: '2021-10-01',
                    den_ngay: '2022-10-01',
                    sl_min: 1,
                    gia0: 10000,
                    ma_thue: '00',
                    thue_suat: 0,
                    gia: 10000
                }
            ]
        },
        {
            oid: 2,
            ma_bang_gia: 'BL2021',
            ten_bang_gia: 'Bảng giá bán lẻ 2021',
            ma_loai_ban: '2',
            ten_loai_ban: 'Bán lẻ',
            ma_loai_bang_gia: '1',
            ten_loai_bang_gia: 'Bảng giá chuẩn',
            status: 1,
            statusname: 'Sử dụng',
            ds_vattu: [
                {
                    oid: 1,
                    ma_vt: 'CT01',
                    ten_vt: 'Chuyên cần',
                    ma_loai_ad: '1',
                    ten_loai_ad: 'Khách hàng',
                    nh_kh: '',
                    ma_kh: '',
                    tu_ngay: '2021-10-01',
                    den_ngay: '2022-10-01',
                    sl_min: 1,
                    gia0: 10000,
                    ma_thue: '00',
                    thue_suat: 0,
                    gia: 10000
                }
            ]
        },
        {
            oid: 3,
            ma_bang_gia: 'GV2021',
            ten_bang_gia: 'Bảng giá giờ vàng 2021',
            ma_loai_ban: '1',
            ten_loai_ban: 'Bán buôn',
            ma_loai_bang_gia: '3',
            ten_loai_bang_gia: 'Bảng giá giờ vàng',
            status: 1,
            statusname: 'Sử dụng',
            ds_vattu: [
                {
                    oid: 1,
                    ma_vt: 'CT01',
                    ten_vt: 'Chuyên cần',
                    ma_loai_ad: '1',
                    ten_loai_ad: 'Khách hàng',
                    nh_kh: '',
                    ma_kh: 'KH0001',
                    tu_ngay: '2021-10-01',
                    den_ngay: '2022-10-01',
                    tu_gio: '06:00:00',
                    den_gio: '23:00:00',
                    sl_min: 1,
                    gia0: 10000,
                    ma_thue: '00',
                    thue_suat: 0,
                    gia: 10000
                }
            ]
        }
    ];
    var ct_temp;

    var ds_banggia_init = angular.copy($scope.ds_banggia);

    var ds_banggia_temp = angular.copy($scope.ds_banggia);
    //#endregion 


    //#region  tìm kiếm
    $scope.Search = function (search_params) {
        Search(search_params);
    }

    function Search(search_params) {
        var ds_tknhanh = $filter('filter')(ds_banggia_temp,
            {
                ma_loai_ban: search_params.loaiban.ma_loai_ban,
                ma_loai_bang_gia: search_params.loaibanggia.ma_loai_bang_gia,
                status: search_params.trangthai.status,
                $: search_params.keyword
            });
        $scope.ds_banggia = ds_tknhanh;
    }

    $scope.Reload = function () {
        $scope.ds_banggia = ds_banggia_init;
    }

    $scope.OnClick = function (item, index) {
        item.checked = !item.checked;
    }
    //#endregion 


    //#region FORM mmodal
    $scope.Add = function () {
        $scope.add_yn = true;
        //gán thông tin mặc định
        //InitData();

        //show modal
        $("#addItemModal").modal('show');
        //focus vào trường đầu tiên
        setTimeout(function () {
            angular.element('#addItemModal input').first().focus();
        }, 200);
    }

    $scope.Edit = function (ctdm) {
        //trường hợp click btn Sửa trên dòng
        if (ctdm != null) {
            EditModal(ctdm);

        } else {
            //kiểm tra xem đã có dòng nào đc chọn chưa
            var selecteds = $scope.ds_banggia.filter(function (item)
            { return item.checked });
            if (selecteds.length === 0) {
                alert("Chưa có dòng nào đc chọn");
            }
            else if (selecteds.length === 1) {
                EditModal(selecteds[0]);
            }
            else {
                alert("Chỉ được sửa 1 dòng");
            }
        }
    }

    function EditModal(ctdm) {
        $scope.add_yn = false;
        var nv = angular.copy(ctdm);
        //format lại kiểu date
        nv.ngay_dg = new Date(nv.ngay_dg);
        nv.tu_ngay = new Date(nv.tu_ngay);
        nv.den_ngay = new Date(nv.den_ngay);
        //gán lại loại bán
        for (var i = 0; i < $scope.ds_loaiban.length; i++) {
            if ($scope.ds_loaiban[i].ma_loai_ban == nv.ma_loai_ban) {
                nv.loaiban = $scope.ds_loaiban[i];
                break;
            }
        }
        //gán lại bảng giá
        for (var i = 0; i < $scope.ds_loaibanggia.length; i++) {
            if ($scope.ds_loaibanggia[i].ma_loai_bang_gia == nv.ma_loai_bang_gia) {
                nv.loaibanggia = $scope.ds_loaibanggia[i];
                break;
            }
        }
        //gán lại trạng thái
        for (var i = 0; i < $scope.ds_status.length; i++) {
            if ($scope.ds_status[i].status == nv.status) {
                nv.trangthai = $scope.ds_status[i];
                break;
            }
        }
        $scope.ctdm = nv;
        //copy 
        ct_temp = angular.copy($scope.ctdm);

        $("#addItemModal").modal('show');
        setTimeout(function () {
            angular.element('#addItemModal input').first().focus();
        }, 200);

    }

    $scope.Delete = function (index) {
        if (index > -1) {
            var r = confirm("Bạn có chắc chắn muốn xóa");
            if (r == true) {
                $scope.ds_banggia.splice(index, 1);
                ds_banggia_temp = angular.copy($scope.ds_banggia);
            }
        } else {
            var selecteds = $scope.ds_banggia.filter(function (item)
            { return item.checked });
            if (selecteds.length === 0) {
                alert("Chưa có dòng nào đc chọn");
            }
            else {
                var r = confirm("Bạn có chắc chắn muốn xóa");
                if (r == true) {
                    //lấy ra ds các dòng k đc chọn
                    var notSelected = $scope.ds_banggia.filter(function (item) {
                        return !item.checked;
                    });
                    //dữ liệu còn lại là các dòng k đc chọn
                    $scope.ds_banggia = notSelected;
                    ds_banggia_temp = angular.copy($scope.ds_banggia);

                }
            }
        }
    }

    $scope.Save = function (item, add_more) {
            if (item.ds_vattu.length == 0) {
                alert("Chưa nhập chi tiết");
            } else {
                item.ma_loai_ban = item.loaiban.ma_loai_ban;
                item.ten_loai_ban = item.loaiban.ten_loai_ban;
                item.ma_loai_bang_gia = item.loaibanggia.ma_loai_bang_gia;
                item.ten_loai_bang_gia = item.loaibanggia.ten_loai_bang_gia;
                item.status = item.trangthai.status;
                item.statusname = item.trangthai.statusname;

                var check_dup = false;
                if ($scope.add_yn) {
                    for (var i = 0; i < $scope.ds_banggia.length; i++) {
                        if ($scope.ds_banggia[i].ma_bang_gia === item.ma_bang_gia) {
                            check_dup = true;
                            break;
                        }
                    }
                    if (!check_dup) {
                        $scope.ds_banggia.push(item);
                    } else {
                        $scope.submitted = true;
                        alert("Dữ liệu đã tồn tại trong hệ thống");
                        return false;
                    }

                } else {
                    var index_edit;
                    //check trùng mã bảng giá khi sửa
                    for (var i = 0; i < $scope.ds_banggia.length; i++) {
                        //kiểm tra cùng mã bg, nếu khác oid => trùng
                        if ($scope.ds_banggia[i].ma_bang_gia === item.ma_bang_gia
                            && $scope.ds_banggia[i].oid != item.oid) {
                            check_dup = true;
                            break;
                        } else if ($scope.ds_banggia[i].oid == item.oid) {
                            index_edit = i;
                        }
                    }
                    if (!check_dup) {
                        $scope.ds_banggia[index_edit] = item;
                    } else {
                        $scope.submitted = true;
                        alert("Dữ liệu đã tồn tại trong hệ thống");
                        return false;
                    }
                }
                $scope.submitted = false;
                // gán lại mảng temp để sử dụng khi tìm kiếm
                ds_banggia_temp = angular.copy($scope.ds_banggia);
                //Nhấn lưu và thêm => reset data
                if (add_more) {
                    //InitData();
                } else {
                    $("#addItemModal").modal('hide');
                }

            }
    }

    $scope.Close = function (id) {
        //InitData();

        //gán lại dữ liệu cũ trong trường hợp sửa
        if (ct_temp != null) {
            for (var i = 0; i < $scope.ds_banggia.length; i++) {
                if ($scope.ds_banggia[i].ma_bang_gia === ct_temp.ma_bang_gia) {
                    $scope.ds_banggia[i] = ct_temp;
                    break;
                }
            }
        }
        //gán lại ct_temp
        ct_temp = null;
    }

    function InitData() {
        $scope.ctdm = {
            oid: CustomFactory.GetOID($scope.ds_banggia),
            ma_bang_gia: '',
            ten_bang_gia: '',
            loaiban: $scope.ds_loaiban[1],
            loaibanggia: $scope.ds_loaibanggia[1],
            trangthai: $scope.ds_status[1],
            ds_vattu: []
        };
        $scope.submitted = false;
    }

    $scope.ChangeCombobox = function (type, object) {
        switch (type) {
            case 'loaiban': {
                $scope.ctdm.tu_ngay = new Date(object.tu_ngay);
                $scope.ctdm.den_ngay = new Date(object.den_ngay);
                break;
            }
            case 'thue': {
                $scope.ctdmct.thue_suat = object.thue_suat;

                TinhGiaSauVAT();
                break;
            }
        }
    }

    //#endregion

    //#region FORM chi tiết vật tư
    var ctdmct_temp = null;
    $scope.AddCT = function () {
        $scope.addct_yn = true;
        //gán thông tin mặc định
        //InitDataCT();

        //show modal
        $("#addItemCT").modal('show');

        setTimeout(function () {
            angular.element('#addItemCT input').first().focus();
        }, 200);
    }

    $scope.EditCT = function (ct) {
        //trường hợp click btn Sửa trên dòng
        if (ct != null) {
            $scope.addct_yn = false;
            $scope.ctdmct = angular.copy(ct);

            //format lại kiểu date/time
            $scope.ctdmct.tu_ngay = new Date($scope.ctdmct.tu_ngay);
            $scope.ctdmct.den_ngay = new Date($scope.ctdmct.den_ngay);
            if ($scope.ctdm.ma_loai_bang_gia == "3") {
                $scope.ctdmct.tu_gio = GetDateFromHours($scope.ctdmct.tu_gio);
                $scope.ctdmct.den_gio = GetDateFromHours($scope.ctdmct.den_gio);
            }
            //gán lại loại áp dụng
            for (var i = 0; i < $scope.ds_loaiad.length; i++) {
                if ($scope.ds_loaiad[i].ma_loai_ad == $scope.ctdmct.ma_loai_ad) {
                    $scope.ctdmct.loai_ad = $scope.ds_loaiad[i];
                    break;
                }
            }
            //gán lại thuế
            for (var i = 0; i < $scope.ds_thue.length; i++) {
                if ($scope.ds_thue[i].ma_thue == $scope.ctdmct.ma_thue) {
                    $scope.ctdmct.thue = $scope.ds_thue[i];
                    break;
                }
            }
            //lưu ra đây tránh trường hợp sửa rồi nhưng k lưu sẽ bị mất giá trị cũ
            ctdmct_temp = angular.copy($scope.ctdmct);
            $("#addItemCT").modal('show');
            setTimeout(function () {
                angular.element('#addItemCT input').first().focus();
            }, 200);
        }
    }

    $scope.DeleteCT = function (index) {
        if (index > -1) {
            $scope.ctdm.ds_vattu.splice(index, 1);
        }
    }

    $scope.SaveCT = function (item, copy_yn) {
            //gán lại các trường combobox
            item.ma_loai_ad = item.loai_ad.ma_loai_ad;
            item.ten_loai_ad = item.loai_ad.ten_loai_ad;
            item.ma_thue = item.thue.ma_thue;
            item.ten_thue = item.thue.ten_thue;
            //set lại mã khách/mã nhóm.. AD theo khách => nhóm = ""
            if (item.ma_loai_ad == "1") {
                item.nh_kh = "";
            } else {
                item.ma_kh = "";
            }

            var check_dup = false;
            if ($scope.addct_yn) {
                for (var i = 0; i < $scope.ctdm.ds_vattu.length; i++) {
                    if ($scope.ctdm.ds_vattu[i].ma_vt === item.ma_vt
                        && $scope.ctdm.ds_vattu[i].ma_loai_ad === item.ma_loai_ad
                        && $scope.ctdm.ds_vattu[i].ma_kh === item.ma_kh
                        && $scope.ctdm.ds_vattu[i].nh_kh === item.nh_kh
                        && FormatDateToE($scope.ctdm.ds_vattu[i].tu_ngay) == FormatDateToE(item.tu_ngay)
                        && FormatDateToE($scope.ctdm.ds_vattu[i].den_ngay) == FormatDateToE(item.den_ngay)
                        && $scope.ctdm.ds_vattu[i].sl_min == item.sl_min) {
                        check_dup = true;
                        break;
                    }
                }
                //set lại trường giờ:
                if ($scope.ctdm.ma_loai_bang_gia == "3") {
                    item.tu_gio = new Date(item.tu_gio).getHours() + ":" + new Date(item.tu_gio).getMinutes() + ":" + new Date(item.tu_gio).getMilliseconds();
                    item.den_gio = new Date(item.den_gio).getHours() + ":" + new Date(item.den_gio).getMinutes() + ":" + new Date(item.den_gio).getMilliseconds();
                }
                if (!check_dup) {
                    $scope.ctdm.ds_vattu.push(angular.copy(item));
                } else {
                    $scope.submitted = true;
                    alert("Dữ liệu đã tồn tại trong hệ thống");
                    return false;
                }

            } else {
                var index_edit;
                //check trùng mã bảng giá khi sửa
                
                var check_dup = false;
                if (!check_dup) {
                    $scope.ctdm.ds_vattu[index_edit] = angular.copy(item);
                } else {
                    $scope.submitted = true;
                    alert("Dữ liệu đã tồn tại trong hệ thống");
                    angular.element('#addItemCT input').first().focus();
                    return false;
                }
            }

            $scope.submittedCT = false;
            //Nhấn lưu và copy => reset data
            if (copy_yn) {
                //InitDataCT(copy_yn);
                angular.element('#addItemCT input').first().focus();
            } else {
                $("#addItemCT").modal('hide');
            }
    }

    $scope.CloseCT = function (id) {
        //InitDataCT();
        //gán lại dữ liệu cũ
        if (ctdmct_temp != null) {
            for (var i = 0; i < $scope.ctdm.ds_vattu.length; i++) {
                if ($scope.ctdm.ds_vattu[i].ma_chi_tieu === ctdmct_temp.ma_chi_tieu) {
                    $scope.ctdm.ds_vattu[i] = ctdmct_temp;
                    break;
                }
            }
        }
        ctdmct_temp = null;
    }

    function InitDataCT(copy_yn) {
        if (!copy_yn) {
            $scope.ctdmct = {
                oid: $scope.ctdm.ds_vattu.length > 0 ? CustomFactory.GetOID($scope.ctdm.ds_vattu) : 1,
                ma_bang_gia: $scope.ctdm.ma_bang_gia,
                ma_vt: '',
                ten_vt: '',
                loai_ad: $scope.ds_loaiad[0],
                nh_kh: '',
                ma_kh: '',
                tu_ngay: new Date(),
                den_ngay: new Date(),
                tu_gio: new Date(2021, 0, 1, 0, 1, 0),
                den_gio: new Date(2021, 0, 1, 23, 59, 0),
                sl_min: 1,
                gia0: 0,
                thue: $scope.ds_thue[0],
                thue_suat: 0,
                gia: 0
            }
        } else {
            $scope.ctdmct.oid = $scope.ctdm.ds_vattu.length > 0 ? CustomFactory.GetOID($scope.ctdm.ds_vattu) : 1
        }
        $scope.submittedCT = false;
    }

    $scope.TinhGiaSauVAT = function () {
        TinhGiaSauVAT();
    }

    function TinhGiaSauVAT() {
        $scope.ctdmct.gia = CustomFactory.ComputeVAT($scope.ctdmct.gia0, $scope.ctdmct.thue_suat);
    }
    //#endregion

    //#region REFERENCES
    function GetDateFromHours(time) {
        time = time.split(':');
        let now = new Date();
        return new Date(now.getFullYear(), now.getMonth(), now.getDate(), time[0], time[1], time[2]);
    }

    function FormatDateToE(date, separator, type) {
        var n_date = new Date(date);
        var day = n_date.getDate() < 10 ? '0' + n_date.getDate() : n_date.getDate();
        var month = (n_date.getMonth() + 1) < 10 ? '0' + (n_date.getMonth() + 1) : (n_date.getMonth() + 1);
        var year = n_date.getFullYear();
        separator = separator ? separator : '-';
        if (angular.isUndefined(type) || type == 'E')
            return year + separator + month + separator + day;
        else return day + separator + month + separator + year;
    }
    //#endregion 


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
