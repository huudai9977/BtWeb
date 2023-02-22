using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace API.Models
{
    public class Employee
    {
        public string ma_nv { get; set; }
        public string ten_nv { get; set; }
        public string khoa_dt { get; set; }
        public string ngay_dg { get; set; }
        public string tu_ngay { get; set; }
        public string den_ngay { get; set; }
        public string bo_phan { get; set; }
        public string sdt { get; set; }
        public string nguoi_hd { get; set; }
        public short tong_diem { get; set; }

    }
}