﻿//------------------------------------------------------------------------------
// <auto-generated>
//     이 코드는 도구를 사용하여 생성되었습니다.
//     런타임 버전:4.0.30319.42000
//
//     파일 내용을 변경하면 잘못된 동작이 발생할 수 있으며, 코드를 다시 생성하면
//     이러한 변경 내용이 손실됩니다.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Wow.Tv.Admin.ExpertService {
    
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    [System.ServiceModel.ServiceContractAttribute(ConfigurationName="ExpertService.IExpertService")]
    public interface IExpertService {
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IExpertService/GetAt", ReplyAction="http://tempuri.org/IExpertService/GetAtResponse")]
        Wow.Tv.Middle.Model.Db49.broadcast.Pro_wowList GetAt(int payNo);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IExpertService/GetAt", ReplyAction="http://tempuri.org/IExpertService/GetAtResponse")]
        System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db49.broadcast.Pro_wowList> GetAtAsync(int payNo);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IExpertService/SearchList", ReplyAction="http://tempuri.org/IExpertService/SearchListResponse")]
        Wow.Tv.Middle.Model.Common.ListModel<Wow.Tv.Middle.Model.Db49.broadcast.Pro_wowList> SearchList(Wow.Tv.Middle.Model.Db49.broadcast.MyProgram.ExpertCondition condition);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IExpertService/SearchList", ReplyAction="http://tempuri.org/IExpertService/SearchListResponse")]
        System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Common.ListModel<Wow.Tv.Middle.Model.Db49.broadcast.Pro_wowList>> SearchListAsync(Wow.Tv.Middle.Model.Db49.broadcast.MyProgram.ExpertCondition condition);
    }
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    public interface IExpertServiceChannel : Wow.Tv.Admin.ExpertService.IExpertService, System.ServiceModel.IClientChannel {
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    public partial class ExpertServiceClient : System.ServiceModel.ClientBase<Wow.Tv.Admin.ExpertService.IExpertService>, Wow.Tv.Admin.ExpertService.IExpertService {
        
        public ExpertServiceClient() {
        }
        
        public ExpertServiceClient(string endpointConfigurationName) : 
                base(endpointConfigurationName) {
        }
        
        public ExpertServiceClient(string endpointConfigurationName, string remoteAddress) : 
                base(endpointConfigurationName, remoteAddress) {
        }
        
        public ExpertServiceClient(string endpointConfigurationName, System.ServiceModel.EndpointAddress remoteAddress) : 
                base(endpointConfigurationName, remoteAddress) {
        }
        
        public ExpertServiceClient(System.ServiceModel.Channels.Binding binding, System.ServiceModel.EndpointAddress remoteAddress) : 
                base(binding, remoteAddress) {
        }
        
        public Wow.Tv.Middle.Model.Db49.broadcast.Pro_wowList GetAt(int payNo) {
            return base.Channel.GetAt(payNo);
        }
        
        public System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db49.broadcast.Pro_wowList> GetAtAsync(int payNo) {
            return base.Channel.GetAtAsync(payNo);
        }
        
        public Wow.Tv.Middle.Model.Common.ListModel<Wow.Tv.Middle.Model.Db49.broadcast.Pro_wowList> SearchList(Wow.Tv.Middle.Model.Db49.broadcast.MyProgram.ExpertCondition condition) {
            return base.Channel.SearchList(condition);
        }
        
        public System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Common.ListModel<Wow.Tv.Middle.Model.Db49.broadcast.Pro_wowList>> SearchListAsync(Wow.Tv.Middle.Model.Db49.broadcast.MyProgram.ExpertCondition condition) {
            return base.Channel.SearchListAsync(condition);
        }
    }
}