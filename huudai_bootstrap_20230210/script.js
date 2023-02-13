var check_sk="";
var choose_keykdt="";
var ds_khoa_dt = [{
    keykdt : "A1",
    ma_kdt :"agl",
    ma_nv :"abc",
    ten_nv:"bca",
    ngay_dg:"2023-02-20",
    bp:"RD",
    ng_hd:"jkl",
    diem: 9
},
{
    keykdt : "A2",
    ma_kdt :"agl",
    ma_nv :"abc",
    ten_nv:"bca",
    ngay_dg:"2023-02-20",
    bp:"RD",
    ng_hd:"jkl",
    diem: 9
},
{
    keykdt : "A3",
    ma_kdt :"agl",
    ma_nv :"abc",
    ten_nv:"bca",
    ngay_dg:"2023-02-20",
    bp:"RD",
    ng_hd:"jkl",
    diem: 9
},
{
    keykdt : "A4",
    ma_kdt :"agl",
    ma_nv :"abc",
    ten_nv:"bca",
    ngay_dg:"2023-02-20",
    bp:"RD",
    ng_hd:"jkl",
    diem: 9
},
{
    keykdt : "A5",
    ma_kdt :"agl",
    ma_nv :"abc",
    ten_nv:"bca",
    ngay_dg:"2023-02-20",
    bp:"RD",
    ng_hd:"jkl",
    diem: 9
},
{
    keykdt : "A6",
    ma_kdt :"agl",
    ma_nv :"abc",
    ten_nv:"bca",
    ngay_dg:"2023-02-20",
    bp:"RD",
    ng_hd:"jkl",
    diem: 9
}
];

document.getElementById("modal_title").innerHTML ="Thêm mới vật tư"
function LoadData(){
    var hien_thi = '';
    for(var i=0;i<ds_khoa_dt.length;i++){
        var _xl =""
        var diem = ds_khoa_dt[i].diem;
        if(diem >8 && diem <10){
            _xl ="tot"
        }
        if(diem < 8 && diem >6.5)
        {
            _xl = "kha"
        }
        if(diem >0 && diem <6.5)
        {
            _xl = "TB"
        }
        hien_thi += "<tr onclick ='choose( &#39"+ ds_khoa_dt[i].keykdt +" &#39)' ondblclick = 'EditData(&#39"+ ds_khoa_dt[i].keykdt +"&#39)'> <td>" +parseInt(i+1) 
        +"</td> <td><input type = 'checkbox'> </td><td> <button onclick = 'EditData(&#39"+ds_khoa_dt[i].keykdt+"&#39)' type='button' class='fa fa-edit'></button> </td><td> <button onclick = 'DeleteData(&#39"+ds_khoa_dt[i].keykdt+"&#39)' type='button' class='fa fa-trash-o color-red'></button> </td> <td>" 
        +ds_khoa_dt[i].ma_kdt +"</td><td>" + ds_khoa_dt[i].ma_kdt +"</td> <td>"
                    +ds_khoa_dt[i].ten_nv+"</td><td>"+ds_khoa_dt[i].bp+"</td><td>"+ds_khoa_dt[i].ngay_dg+"</td><td>"+ds_khoa_dt[i].ng_hd+"</td><td>"+ds_khoa_dt[i].diem+"</td><td>"+_xl+"</td><td style='display:none;' >"+ds_khoa_dt[i].keykdt+"</td></tr>";
    }
    document.getElementById("danh_sach").innerHTML= hien_thi;
    document.getElementById("ds_khoa_dt_length").innerHTML= ds_khoa_dt.length;
};
function choose(keykdt){
   choose_keykdt= keykdt;
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
    var keykdt = document.getElementById("keykdt").value;
    if(check_sk == "A")
    {
        
        if(keykdt == "" || keykdt == null){
            alert("Mã vật tư không để trống");
            return false;
        }
        for(var i = 0;i<ds_khoa_dt.length;i++){
            if(ds_khoa_dt[i].keykdt == keykdt){
                alert("Mã vật tư bị trùng");
                return false;
            }
        }
        var new_vt ={
            keykdt : document.getElementById("keykdt").value,
            ma_kdt: document.getElementById("ma_kdt").value,
            ma_nv: document.getElementById("ma_nv").value,
            ten_nv: document.getElementById("ten_nv").value,
            ngay_dg: document.getElementById("ngay_dg").value,
            bp: document.getElementById("bp").value,
            ng_hd: document.getElementById("ng_hd").value,
            diem: document.getElementById("diem").value,
        };
        ds_khoa_dt.push(new_vt);
        LoadData();
        $(document).ready(function(){
            $('#myModal').modal('hide');
        }
        )
    }
    else if(check_sk == "E")
    {
        for(var i=0;i<ds_khoa_dt.length;i++){
            if(ds_khoa_dt[i].keykdt == keykdt){
            ds_khoa_dt[i].keykdt = document.getElementById("keykdt").value;
            ds_khoa_dt[i].ma_kdt = document.getElementById("ma_kdt").value;
            ds_khoa_dt[i].ma_nv = document.getElementById("ma_nv").value;
            ds_khoa_dt[i].ten_nv =document.getElementById("ten_nv").value;
            ds_khoa_dt[i].ngay_dg = document.getElementById("ngay_dg").value;
            ds_khoa_dt[i].bp = document.getElementById("bp").value;
            ds_khoa_dt[i].ng_hd = document.getElementById("ng_hd").value;
            ds_khoa_dt[i].diem = document.getElementById("diem").value;
            }
            
        }
        LoadData();
        $(document).ready(function(){
            $('#myModal').modal('hide');
        }
        )
    }
    
}
function DeleteData(keykdt){
    if(keykdt=="")
        keykdt= choose_keykdt;
    var check = confirm("Bạn có chắc chắn xóa vật tư " + keykdt + " không ?");
    if(check){
        for(var i=0;i<ds_khoa_dt.length;i++){
            if(ds_khoa_dt[i].keykdt == keykdt)
            ds_khoa_dt.splice(i,1);
        }
        LoadData();
    }
}

function EditData(keykdt){
    if(keykdt=="")
        keykdt= choose_keykdt;
    $(document).ready(function(){
        $("#myModal").modal('show');
        });
        document.getElementById("modal_title").innerHTML ="Sửa vật tư";
        check_sk ="E";
        for(var i =0;i<ds_khoa_dt.length;i++){
            if(ds_khoa_dt[i].keykdt == keykdt){
            document.getElementById("keykdt").value = ds_khoa_dt[i].keykdt ;
            document.getElementById("ma_kdt").value = ds_khoa_dt[i].ma_kdt ;
            document.getElementById("ma_nv").value = ds_khoa_dt[i].ma_nv;
            document.getElementById("ten_nv").value =ds_khoa_dt[i].ten_nv ;
            document.getElementById("ngay_dg").value = ds_khoa_dt[i].ngay_dg ;
            document.getElementById("bp").value =ds_khoa_dt[i].bp;
            document.getElementById("ng_hd").value = ds_khoa_dt[i].ng_hd;
            document.getElementById("diem").value =ds_khoa_dt[i].diem ;
                  break;
            }
        }
     
}
$(document).ready(function(){
    $("#search_key").keyup(function(){
            $("#danh_sach").html('');
            var key = $("#search_key").val();
            for(var i = 0;i < ds_khoa_dt.length;i++){
                if(ds_khoa_dt[i].keykdt.indexOf(key) != -1){
                    $("#danh_sach").append("<tr ondblclick = 'EditData( &#39"+ ds_khoa_dt[i].keykdt +"&#39)'> <td>" +parseInt(i+1) +"</td> <td>  <button onclick = 'DeleteData(&#39"+ds_khoa_dt[i].keykdt+"&#39)' type='button' class='fa fa-trash-o color-red'></button> </td> <td>" 
                    +ds_khoa_dt[i].keykdt +"</td><td>" + ds_khoa_dt[i].ten_vt +"</td> <td>"
                                +ds_khoa_dt[i].dvt+"</td><td>"+ds_khoa_dt[i].theo_doi_ton_kho+"</td> <td>"+ds_khoa_dt[i].cach_tinh_gia+"</td><td>"+
                                ds_khoa_dt[i].quan_ly_lo+"</td><td>"+ds_khoa_dt[i].quan_ly_serial+"</td><td>"+ds_khoa_dt[i].nhom1+"</td> <td>"+ds_khoa_dt[i].nhom2+"</td></tr>");
                }
               
            }
        })
}
)




