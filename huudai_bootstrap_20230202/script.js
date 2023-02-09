var check_sk="";
var choose_ma_vt="";
var ds_vt = [{
    ma_vt :"VT0001",
    ten_vt:"Vật tư test 0001",
    dvt:"CAI",
    theo_doi_ton_kho:"Có",
    cach_tinh_gia:"Trung bình tháng",
    quan_ly_lo:"Không quản lý",
    quan_ly_serial:"Không quản lý",
    nhom1:"NL",
    nhom2:"NDs",
    ngay:"2-3-2023" ,
    sdt:"02154",
    tien: 1356.5
},
{
    ma_vt :"VT0002",
    ten_vt:"Vật tư test 0002",
    dvt:"BAO",
    theo_doi_ton_kho:"Không",
    cach_tinh_gia:"Trung bình tháng",
    quan_ly_lo:"Có quản lý",
    quan_ly_serial:"Có quản lý",
    nhom1:"VT",
    nhom2:"NDs",
    ngay:"2-3-2023",
    sdt:"02154",
    tien: 1356.5
}];

document.getElementById("modal_title").innerHTML ="Thêm mới vật tư"
function LoadData(){
    var hien_thi = '';
    for(var i=0;i<ds_vt.length;i++){
        hien_thi += "<tr id ='ln' onclick ='choose( &#39"+ ds_vt[i].ma_vt +"&#39)' ondblclick = 'EditData( &#39"+ ds_vt[i].ma_vt +"&#39)'> <td>" +parseInt(i+1) +"</td> <td><input type = 'checkbox'> </td><td> <button onclick = 'DeleteData(&#39"+ds_vt[i].ma_vt+"&#39)' type='button' class='fa fa-trash-o color-red'></button> </td> <td>" 
        +ds_vt[i].ma_vt +"</td><td>" + ds_vt[i].ten_vt +"</td> <td>"
                    +ds_vt[i].dvt+"</td><td>"+ds_vt[i].theo_doi_ton_kho+"</td> <td>"+ds_vt[i].cach_tinh_gia+"</td><td>"+
                    ds_vt[i].quan_ly_lo+"</td><td>"+ds_vt[i].quan_ly_serial+"</td><td>"+ds_vt[i].nhom1+"</td><td>"+ds_vt[i].nhom2+"</td><td>"+
                    ds_vt[i].ngay+"</td><td>"+ds_vt[i].sdt+"</td><td>"+ds_vt[i].tien.toString()+"</td></tr>";
    }
    document.getElementById("danh_sach").innerHTML= hien_thi;
};
function choose(ma_vt){
   choose_ma_vt= ma_vt;
   $( "#ln" ).removeClass( "ui-widget-content jqgrow ui-row-ltr").addClass( "ui-widget-content jqgrow ui-row-ltr ui-state-highlight" );
}
LoadData();
function reset(){
    LoadData();
    search_key.value="";
}
function FormAdd(){
    document.getElementById("modal_title").innerHTML ="Thêm mới vật tư";
    check_sk ="A";
}
function SaveData(){
    var ma_vt = document.getElementById("ma_vt").value;
    if(check_sk == "A")
    {
        
        if(ma_vt == "" || ma_vt == null){
            alert("Mã vật tư không để trống");
            return false;
        }
        for(var i = 0;i<ds_vt.length;i++){
            if(ds_vt[i].ma_vt == ma_vt){
                alert("Mã vật tư bị trùng");
                return false;
            }
        }
        var new_vt ={
            ma_vt : document.getElementById("ma_vt").value,
            ten_vt: document.getElementById("ten_vt").value,
            dvt: document.getElementById("dvt").value,
            theo_doi_ton_kho: document.getElementById("theo_doi_ton_kho").value,
            cach_tinh_gia: document.getElementById("tinh_gia").value,
            quan_ly_lo: document.getElementById("ql_lo").value,
            quan_ly_serial: document.getElementById("ql_serial").value,
            nhom1: document.getElementById("loai_vt1").value,
            nhom2: document.getElementById("loai_vt2").value,
            ngay: document.getElementById("ngay").value,
            sdt: document.getElementById("sdt").value,
            tien: document.getElementById("tien").value
        };
        ds_vt.push(new_vt);
        LoadData();
        $(document).ready(function(){
            $('#myModal').modal('hide');
        }
        )
    }
    else if(check_sk == "E")
    {
        for(var i=0;i<ds_vt.length;i++){
            if(ds_vt[i].ma_vt == ma_vt)
            ds_vt[i].ten_vt= document.getElementById("ten_vt").value;
            ds_vt[i].dvt= document.getElementById("dvt").value;
            ds_vt[i].theo_doi_ton_kho= document.getElementById("theo_doi_ton_kho").value;
            ds_vt[i].cach_tinh_gia= document.getElementById("tinh_gia").value;
            ds_vt[i].quan_ly_lo= document.getElementById("ql_lo").value;
            ds_vt[i].dvt= document.getElementById("dvt").value;
            ds_vt[i].quan_ly_serial = document.getElementById("ql_serial").value;
            ds_vt[i].nhom1 = document.getElementById("loai_vt1").value;
            ds_vt[i].nhom2 = document.getElementById("loai_vt2").value;
            ds_vt[i].ngay = document.getElementById("ngay").value;
            ds_vt[i].sdt = document.getElementById("sdt").value;
            ds_vt[i].tien = document.getElementById("tien").value;
        }
        LoadData();
        $(document).ready(function(){
            $('#myModal').modal('hide');
        }
        )
    }
    
}
function DeleteData(ma_vt){
    if(ma_vt=="")
        ma_vt= choose_ma_vt;
    var check = confirm("Bạn có chắc chắn xóa vật tư " + ma_vt + " không ?");
    if(check){
        for(var i=0;i<ds_vt.length;i++){
            if(ds_vt[i].ma_vt == ma_vt)
            ds_vt.splice(i,1);
        }
        LoadData();
    }
}

function EditData(ma_vt){
    if(ma_vt=="")
        ma_vt= choose_ma_vt;
    $(document).ready(function(){
        $("#myModal").modal('show');
        });
        document.getElementById("modal_title").innerHTML ="Sửa vật tư";
        check_sk ="E";
        for(var i =0;i<ds_vt.length;i++){
            if(ds_vt[i].ma_vt == ma_vt){
                document.getElementById("ma_vt").value = ma_vt,
                document.getElementById("ten_vt").value = ds_vt[i].ten_vt,
                 document.getElementById("dvt").value = ds_vt[i].dvt,
                  document.getElementById("theo_doi_ton_kho").value = ds_vt[i].theo_doi_ton_kho,
                  document.getElementById("tinh_gia").value = ds_vt[i].tinh_gia,
                  document.getElementById("ql_lo").value = ds_vt[i].ql_lo,
                  document.getElementById("ql_serial").value = ds_vt[i].ql_serial;
                  document.getElementById("loai_vt1").value = ds_vt[i].nhom1;
                  document.getElementById("loai_vt2").value = ds_vt[i].nhom2;
                  break;
            }
        }
     
}
$(document).ready(function(){
    $("#search_key").keyup(function(){
            $("#danh_sach").html('');
            var key = $("#search_key").val();
            for(var i = 0;i < ds_vt.length;i++){
                if(ds_vt[i].ma_vt.indexOf(key) != -1){
                    $("#danh_sach").append("<tr ondblclick = 'EditData( &#39"+ ds_vt[i].ma_vt +"&#39)'> <td>" +parseInt(i+1) +"</td> <td>  <button onclick = 'DeleteData(&#39"+ds_vt[i].ma_vt+"&#39)' type='button' class='fa fa-trash-o color-red'></button> </td> <td>" 
                    +ds_vt[i].ma_vt +"</td><td>" + ds_vt[i].ten_vt +"</td> <td>"
                                +ds_vt[i].dvt+"</td><td>"+ds_vt[i].theo_doi_ton_kho+"</td> <td>"+ds_vt[i].cach_tinh_gia+"</td><td>"+
                                ds_vt[i].quan_ly_lo+"</td><td>"+ds_vt[i].quan_ly_serial+"</td><td>"+ds_vt[i].nhom1+"</td> <td>"+ds_vt[i].nhom2+"</td></tr>");
                }
               
            }
        })
}
)



