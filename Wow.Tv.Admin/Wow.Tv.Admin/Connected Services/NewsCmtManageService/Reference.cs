﻿//------------------------------------------------------------------------------
// <auto-generated>
//     이 코드는 도구를 사용하여 생성되었습니다.
//     런타임 버전:4.0.30319.42000
//
//     파일 내용을 변경하면 잘못된 동작이 발생할 수 있으며, 코드를 다시 생성하면
//     이러한 변경 내용이 손실됩니다.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Wow.Tv.Admin.NewsCmtManageService {
    
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    [System.ServiceModel.ServiceContractAttribute(ConfigurationName="NewsCmtManageService.INewsCmtManageService")]
    public interface INewsCmtManageService {
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/INewsCmtManageService/GetList", ReplyAction="http://tempuri.org/INewsCmtManageService/GetListResponse")]
        Wow.Tv.Middle.Model.Db49.Article.NewsCenter.NewsCmdCodeModel<Wow.Tv.Middle.Model.Db49.Article.NewsCenter.NewsCmtManageModel> GetList(Wow.Tv.Middle.Model.Db49.Article.NewsCenter.NewsCmtCondition condition);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/INewsCmtManageService/GetList", ReplyAction="http://tempuri.org/INewsCmtManageService/GetListResponse")]
        System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db49.Article.NewsCenter.NewsCmdCodeModel<Wow.Tv.Middle.Model.Db49.Article.NewsCenter.NewsCmtManageModel>> GetListAsync(Wow.Tv.Middle.Model.Db49.Article.NewsCenter.NewsCmtCondition condition);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/INewsCmtManageService/Delete", ReplyAction="http://tempuri.org/INewsCmtManageService/DeleteResponse")]
        void Delete(int[] seq);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/INewsCmtManageService/Delete", ReplyAction="http://tempuri.org/INewsCmtManageService/DeleteResponse")]
        System.Threading.Tasks.Task DeleteAsync(int[] seq);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/INewsCmtManageService/Update", ReplyAction="http://tempuri.org/INewsCmtManageService/UpdateResponse")]
        void Update(string seq);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/INewsCmtManageService/Update", ReplyAction="http://tempuri.org/INewsCmtManageService/UpdateResponse")]
        System.Threading.Tasks.Task UpdateAsync(string seq);
    }
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    public interface INewsCmtManageServiceChannel : Wow.Tv.Admin.NewsCmtManageService.INewsCmtManageService, System.ServiceModel.IClientChannel {
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    public partial class NewsCmtManageServiceClient : System.ServiceModel.ClientBase<Wow.Tv.Admin.NewsCmtManageService.INewsCmtManageService>, Wow.Tv.Admin.NewsCmtManageService.INewsCmtManageService {
        
        public NewsCmtManageServiceClient() {
        }
        
        public NewsCmtManageServiceClient(string endpointConfigurationName) : 
                base(endpointConfigurationName) {
        }
        
        public NewsCmtManageServiceClient(string endpointConfigurationName, string remoteAddress) : 
                base(endpointConfigurationName, remoteAddress) {
        }
        
        public NewsCmtManageServiceClient(string endpointConfigurationName, System.ServiceModel.EndpointAddress remoteAddress) : 
                base(endpointConfigurationName, remoteAddress) {
        }
        
        public NewsCmtManageServiceClient(System.ServiceModel.Channels.Binding binding, System.ServiceModel.EndpointAddress remoteAddress) : 
                base(binding, remoteAddress) {
        }
        
        public Wow.Tv.Middle.Model.Db49.Article.NewsCenter.NewsCmdCodeModel<Wow.Tv.Middle.Model.Db49.Article.NewsCenter.NewsCmtManageModel> GetList(Wow.Tv.Middle.Model.Db49.Article.NewsCenter.NewsCmtCondition condition) {
            return base.Channel.GetList(condition);
        }
        
        public System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db49.Article.NewsCenter.NewsCmdCodeModel<Wow.Tv.Middle.Model.Db49.Article.NewsCenter.NewsCmtManageModel>> GetListAsync(Wow.Tv.Middle.Model.Db49.Article.NewsCenter.NewsCmtCondition condition) {
            return base.Channel.GetListAsync(condition);
        }
        
        public void Delete(int[] seq) {
            base.Channel.Delete(seq);
        }
        
        public System.Threading.Tasks.Task DeleteAsync(int[] seq) {
            return base.Channel.DeleteAsync(seq);
        }
        
        public void Update(string seq) {
            base.Channel.Update(seq);
        }
        
        public System.Threading.Tasks.Task UpdateAsync(string seq) {
            return base.Channel.UpdateAsync(seq);
        }
    }
}
