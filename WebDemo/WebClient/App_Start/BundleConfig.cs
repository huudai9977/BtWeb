using System.Web;
using System.Web.Optimization;

namespace WebClient
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {

            bundles.Add(new StyleBundle("~/Content/css").Include(

                 "~/Content/bootstrap/css/bootstrap.min.css",
                 "~/Content/font/font-awesome.css",
                 "~/Content/style.css"

                ));

            #region AngularJS

            bundles.Add(new ScriptBundle("~/bundles/js").Include(
                "~/Content/bootstrap/js/bootstrap.min.js",
                "~/Scripts/angular.js",
                "~/Scripts/angular-ui-router.js",
                "~/Scripts/angular-messages.js"
            ));
            #endregion

            bundles.Add(new ScriptBundle("~/bundles/MyApp").Include(

                       "~/Scripts/MyJS/ModuleMain.js",
                      "~/Scripts/MyJS/CustomerController.js",
                      "~/Scripts/Services/extension.js"
            ));



        }
    }
}
