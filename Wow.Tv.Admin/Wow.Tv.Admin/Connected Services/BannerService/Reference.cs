﻿//------------------------------------------------------------------------------
// <auto-generated>
//     이 코드는 도구를 사용하여 생성되었습니다.
//     런타임 버전:4.0.30319.42000
//
//     파일 내용을 변경하면 잘못된 동작이 발생할 수 있으며, 코드를 다시 생성하면
//     이러한 변경 내용이 손실됩니다.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Wow.Tv.Admin.BannerService {
    
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    [System.ServiceModel.ServiceContractAttribute(ConfigurationName="BannerService.IBannerService")]
    public interface IBannerService {
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IBannerService/GetAt", ReplyAction="http://tempuri.org/IBannerService/GetAtResponse")]
        Wow.Tv.Middle.Model.Db49.wowtv.NTB_PROGRAM_BANNER GetAt(int programBannerSeq);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IBannerService/GetAt", ReplyAction="http://tempuri.org/IBannerService/GetAtResponse")]
        System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db49.wowtv.NTB_PROGRAM_BANNER> GetAtAsync(int programBannerSeq);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IBannerService/SearchList", ReplyAction="http://tempuri.org/IBannerService/SearchListResponse")]
        Wow.Tv.Middle.Model.Common.ListModel<Wow.Tv.Middle.Model.Db49.wowtv.NTB_PROGRAM_BANNER> SearchList(Wow.Tv.Middle.Model.Db49.wowtv.MyProgram.BannerCondition condition);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IBannerService/SearchList", ReplyAction="http://tempuri.org/IBannerService/SearchListResponse")]
        System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Common.ListModel<Wow.Tv.Middle.Model.Db49.wowtv.NTB_PROGRAM_BANNER>> SearchListAsync(Wow.Tv.Middle.Model.Db49.wowtv.MyProgram.BannerCondition condition);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IBannerService/Save", ReplyAction="http://tempuri.org/IBannerService/SaveResponse")]
        int Save(Wow.Tv.Middle.Model.Db49.wowtv.NTB_PROGRAM_BANNER model, Wow.Tv.Middle.Model.Common.LoginUser loginUser);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IBannerService/Save", ReplyAction="http://tempuri.org/IBannerService/SaveResponse")]
        System.Threading.Tasks.Task<int> SaveAsync(Wow.Tv.Middle.Model.Db49.wowtv.NTB_PROGRAM_BANNER model, Wow.Tv.Middle.Model.Common.LoginUser loginUser);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IBannerService/Delete", ReplyAction="http://tempuri.org/IBannerService/DeleteResponse")]
        void Delete(int programBannerSeq);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IBannerService/Delete", ReplyAction="http://tempuri.org/IBannerService/DeleteResponse")]
        System.Threading.Tasks.Task DeleteAsync(int programBannerSeq);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IBannerService/DeleteList", ReplyAction="http://tempuri.org/IBannerService/DeleteListResponse")]
        void DeleteList(int[] seqList);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IBannerService/DeleteList", ReplyAction="http://tempuri.org/IBannerService/DeleteListResponse")]
        System.Threading.Tasks.Task DeleteListAsync(int[] seqList);
    }
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    public interface IBannerServiceChannel : Wow.Tv.Admin.BannerService.IBannerService, System.ServiceModel.IClientChannel {
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    public partial class BannerServiceClient : System.ServiceModel.ClientBase<Wow.Tv.Admin.BannerService.IBannerService>, Wow.Tv.Admin.BannerService.IBannerService {
        
        public BannerServiceClient() {
        }
        
        public BannerServiceClient(string endpointConfigurationName) : 
                base(endpointConfigurationName) {
        }
        
        public BannerServiceClient(string endpointConfigurationName, string remoteAddress) : 
                base(endpointConfigurationName, remoteAddress) {
        }
        
        public BannerServiceClient(string endpointConfigurationName, System.ServiceModel.EndpointAddress remoteAddress) : 
                base(endpointConfigurationName, remoteAddress) {
        }
        
        public BannerServiceClient(System.ServiceModel.Channels.Binding binding, System.ServiceModel.EndpointAddress remoteAddress) : 
                base(binding, remoteAddress) {
        }
        
        public Wow.Tv.Middle.Model.Db49.wowtv.NTB_PROGRAM_BANNER GetAt(int programBannerSeq) {
            return base.Channel.GetAt(programBannerSeq);
        }
        
        public System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db49.wowtv.NTB_PROGRAM_BANNER> GetAtAsync(int programBannerSeq) {
            return base.Channel.GetAtAsync(programBannerSeq);
        }
        
        public Wow.Tv.Middle.Model.Common.ListModel<Wow.Tv.Middle.Model.Db49.wowtv.NTB_PROGRAM_BANNER> SearchList(Wow.Tv.Middle.Model.Db49.wowtv.MyProgram.BannerCondition condition) {
            return base.Channel.SearchList(condition);
        }
        
        public System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Common.ListModel<Wow.Tv.Middle.Model.Db49.wowtv.NTB_PROGRAM_BANNER>> SearchListAsync(Wow.Tv.Middle.Model.Db49.wowtv.MyProgram.BannerCondition condition) {
            return base.Channel.SearchListAsync(condition);
        }
        
        public int Save(Wow.Tv.Middle.Model.Db49.wowtv.NTB_PROGRAM_BANNER model, Wow.Tv.Middle.Model.Common.LoginUser loginUser) {
            return base.Channel.Save(model, loginUser);
        }
        
        public System.Threading.Tasks.Task<int> SaveAsync(Wow.Tv.Middle.Model.Db49.wowtv.NTB_PROGRAM_BANNER model, Wow.Tv.Middle.Model.Common.LoginUser loginUser) {
            return base.Channel.SaveAsync(model, loginUser);
        }
        
        public void Delete(int programBannerSeq) {
            base.Channel.Delete(programBannerSeq);
        }
        
        public System.Threading.Tasks.Task DeleteAsync(int programBannerSeq) {
            return base.Channel.DeleteAsync(programBannerSeq);
        }
        
        public void DeleteList(int[] seqList) {
            base.Channel.DeleteList(seqList);
        }
        
        public System.Threading.Tasks.Task DeleteListAsync(int[] seqList) {
            return base.Channel.DeleteListAsync(seqList);
        }
    }
}