using API.Models;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace API.Controllers
{
    public class NhanVienAPIController : ApiController
    {
        public static List<Employee> nhanviens = new List<Employee>() {
        new Employee()
        {
            khoa_dt= "ANGULARJS",
            ma_nv= "NV001",
            ten_nv= "Nguyễn Trần Kim Anh",
            sdt= "0386948334",
            ngay_dg= "2023-02-09",
            tu_ngay= "2023-01-10",
            den_ngay= "2023-04-15",
            bo_phan= "Dự án",
            tong_diem= 10,
            nguoi_hd= "Lê Văn Nam Thành",
        },
        new Employee()
        {
            khoa_dt= "HTML_CSS",
            ma_nv= "NV002",
            ten_nv= "Nguyễn Văn B",
            sdt= "0386948876",
            ngay_dg= "2023-02-09",
            tu_ngay= "2023-01-10",
            den_ngay= "2023-04-15",
            bo_phan= "R&D",
            tong_diem= 2,
            nguoi_hd= "Nguyễn Kim Huế",
        },
        new Employee()
        {
            khoa_dt= "OTHER",
            ma_nv= "NV003",
            ten_nv= "Nguyễn Văn C",
            sdt= "0386948396",
            ngay_dg= "2023-02-09",
            tu_ngay= "2023-01-10",
            den_ngay= "2023-04-15",
            bo_phan= "R&D",
            tong_diem= 3,
            nguoi_hd= "Nguyễn Kim Huế",
        },
        new Employee()
        {
            khoa_dt= "ANGULARJS",
            ma_nv= "NV004",
            ten_nv= "Lê Quang Đạo",
            sdt= "0386948375",
            ngay_dg= "2023-02-09",
            tu_ngay= "2023-01-10",
            den_ngay= "2023-04-15",
            bo_phan= "Dự án",
            tong_diem= 8,
            nguoi_hd= "Lê Văn Nam Thành",
        },
        new Employee()
        {
            khoa_dt= "HTML_CSS",
            ma_nv= "NV005",
            ten_nv= "Trần Thái Tông",
            sdt= "0386948399",
            ngay_dg= "2023-02-09",
            tu_ngay= "2023-01-10",
            den_ngay= "2023-04-15",
            bo_phan= "R&D",
            tong_diem= 7,
            nguoi_hd= "Lê Văn Nam Thành",
        }
        };

        [HttpGet]
        [ActionName("GetData")]
        public HttpResponseMessage GetData()
        {

            return Request.CreateResponse(HttpStatusCode.OK, new
            {
                Message = "Đây là kết quả trả về",
                Result = nhanviens
            });
        }
        [HttpGet]
        [ActionName("GetById")]
        public HttpResponseMessage GetById(string ma_nv)
        {
            Employee employee = new Employee();
            for (int i = 0; i < nhanviens.Count; i++)
            {
                if(nhanviens[i].ma_nv.Equals(ma_nv))
                {
                    employee = nhanviens[i];
                    break;
                }    
            }
            return Request.CreateResponse(HttpStatusCode.OK, new
            {
                Message = "Đây là kết quả trả về",
                Result = employee
            });
        }
        [HttpPost]
        public HttpResponseMessage ThemMoi(Employee data)
        {
            // Kiểm tra trùng Key
            bool ExistKey = false;
            for (int i = 0; i < nhanviens.Count; i++)
            {
                if (nhanviens[i].ma_nv.Equals(data.ma_nv))
                {
                    ExistKey = true;
                    break;
                }
            }
            if(ExistKey)
                return Request.CreateResponse(HttpStatusCode.OK, new
                {
                    Message = "Trùng key",
                    Result = false
                });
            nhanviens.Add(data);
            return Request.CreateResponse(HttpStatusCode.OK, new
            {
                Message = "Thêm thành công",
                Result = true
            });
        }
        //chỉnh sửa phần tử
        [HttpPut]
        [ActionName("PutData")]
        public HttpResponseMessage PutData(Employee data)
        {
            nhanviens.Where(a => a.ma_nv == data.ma_nv).Select(ctl =>
            {
                ctl.ten_nv = data.ten_nv;
                return ctl;
            }).ToList<Employee>();

            return Request.CreateResponse(HttpStatusCode.OK, new
            {
                Message = "Cập nhật thành công",
                Result = nhanviens
            });
        }
        //xóa phần tử
        [HttpDelete]
        [ActionName("Delete")]
        public HttpResponseMessage Delete(string ma_nv)
        {
            nhanviens.RemoveAll(a => a.ma_nv == ma_nv);
            return Request.CreateResponse(HttpStatusCode.OK, new
            {
                Message = "Xóa thành công",
                Result = nhanviens
            });
        }
    }
}
