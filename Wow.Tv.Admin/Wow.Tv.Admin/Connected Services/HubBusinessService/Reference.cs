﻿//------------------------------------------------------------------------------
// <auto-generated>
//     이 코드는 도구를 사용하여 생성되었습니다.
//     런타임 버전:4.0.30319.42000
//
//     파일 내용을 변경하면 잘못된 동작이 발생할 수 있으며, 코드를 다시 생성하면
//     이러한 변경 내용이 손실됩니다.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Wow.Tv.Admin.HubBusinessService {
    
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    [System.ServiceModel.ServiceContractAttribute(ConfigurationName="HubBusinessService.IHubBusinessService")]
    public interface IHubBusinessService {
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IHubBusinessService/GetList", ReplyAction="http://tempuri.org/IHubBusinessService/GetListResponse")]
        Wow.Tv.Middle.Model.Db49.Article.HubBusiness.HubBusinessModel<Wow.Tv.Middle.Model.Db49.Article.NTB_HUB_BUSINESS> GetList();
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IHubBusinessService/GetList", ReplyAction="http://tempuri.org/IHubBusinessService/GetListResponse")]
        System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db49.Article.HubBusiness.HubBusinessModel<Wow.Tv.Middle.Model.Db49.Article.NTB_HUB_BUSINESS>> GetListAsync();
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IHubBusinessService/Save", ReplyAction="http://tempuri.org/IHubBusinessService/SaveResponse")]
        int Save(Wow.Tv.Middle.Model.Db49.Article.NTB_HUB_BUSINESS model, Wow.Tv.Middle.Model.Common.LoginUser loginUser);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IHubBusinessService/Save", ReplyAction="http://tempuri.org/IHubBusinessService/SaveResponse")]
        System.Threading.Tasks.Task<int> SaveAsync(Wow.Tv.Middle.Model.Db49.Article.NTB_HUB_BUSINESS model, Wow.Tv.Middle.Model.Common.LoginUser loginUser);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IHubBusinessService/Delete", ReplyAction="http://tempuri.org/IHubBusinessService/DeleteResponse")]
        void Delete(int[] deleteList);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IHubBusinessService/Delete", ReplyAction="http://tempuri.org/IHubBusinessService/DeleteResponse")]
        System.Threading.Tasks.Task DeleteAsync(int[] deleteList);
    }
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    public interface IHubBusinessServiceChannel : Wow.Tv.Admin.HubBusinessService.IHubBusinessService, System.ServiceModel.IClientChannel {
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    public partial class HubBusinessServiceClient : System.ServiceModel.ClientBase<Wow.Tv.Admin.HubBusinessService.IHubBusinessService>, Wow.Tv.Admin.HubBusinessService.IHubBusinessService {
        
        public HubBusinessServiceClient() {
        }
        
        public HubBusinessServiceClient(string endpointConfigurationName) : 
                base(endpointConfigurationName) {
        }
        
        public HubBusinessServiceClient(string endpointConfigurationName, string remoteAddress) : 
                base(endpointConfigurationName, remoteAddress) {
        }
        
        public HubBusinessServiceClient(string endpointConfigurationName, System.ServiceModel.EndpointAddress remoteAddress) : 
                base(endpointConfigurationName, remoteAddress) {
        }
        
        public HubBusinessServiceClient(System.ServiceModel.Channels.Binding binding, System.ServiceModel.EndpointAddress remoteAddress) : 
                base(binding, remoteAddress) {
        }
        
        public Wow.Tv.Middle.Model.Db49.Article.HubBusiness.HubBusinessModel<Wow.Tv.Middle.Model.Db49.Article.NTB_HUB_BUSINESS> GetList() {
            return base.Channel.GetList();
        }
        
        public System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db49.Article.HubBusiness.HubBusinessModel<Wow.Tv.Middle.Model.Db49.Article.NTB_HUB_BUSINESS>> GetListAsync() {
            return base.Channel.GetListAsync();
        }
        
        public int Save(Wow.Tv.Middle.Model.Db49.Article.NTB_HUB_BUSINESS model, Wow.Tv.Middle.Model.Common.LoginUser loginUser) {
            return base.Channel.Save(model, loginUser);
        }
        
        public System.Threading.Tasks.Task<int> SaveAsync(Wow.Tv.Middle.Model.Db49.Article.NTB_HUB_BUSINESS model, Wow.Tv.Middle.Model.Common.LoginUser loginUser) {
            return base.Channel.SaveAsync(model, loginUser);
        }
        
        public void Delete(int[] deleteList) {
            base.Channel.Delete(deleteList);
        }
        
        public System.Threading.Tasks.Task DeleteAsync(int[] deleteList) {
            return base.Channel.DeleteAsync(deleteList);
        }
    }
}