using System.Web.Mvc;

namespace Wow.Tv.Admin.Areas.IntegratedBoard
{
    public class IntegratedBoardAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "IntegratedBoard";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            context.MapRoute(
                "IntegratedBoard_default",
                "IntegratedBoard/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}