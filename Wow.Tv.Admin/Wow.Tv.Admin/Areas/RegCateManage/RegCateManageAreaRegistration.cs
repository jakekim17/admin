using System.Web.Mvc;

namespace Wow.Tv.Admin.Areas.RegCateManage
{
    public class RegCateManageAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "RegCateManage";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            context.MapRoute(
                "RegCateManage_default",
                "RegCateManage/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}