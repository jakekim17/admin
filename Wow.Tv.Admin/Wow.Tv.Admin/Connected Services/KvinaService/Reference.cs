﻿//------------------------------------------------------------------------------
// <auto-generated>
//     이 코드는 도구를 사용하여 생성되었습니다.
//     런타임 버전:4.0.30319.42000
//
//     파일 내용을 변경하면 잘못된 동작이 발생할 수 있으며, 코드를 다시 생성하면
//     이러한 변경 내용이 손실됩니다.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Wow.Tv.Admin.KvinaService {
    
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    [System.ServiceModel.ServiceContractAttribute(ConfigurationName="KvinaService.IKvinaService")]
    public interface IKvinaService {
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IKvinaService/KvinaNoticeList", ReplyAction="http://tempuri.org/IKvinaService/KvinaNoticeListResponse")]
        Wow.Tv.Middle.Model.Common.ListModel<Wow.Tv.Middle.Model.Db49.wowtv.Kvina.KvinaNoticeList> KvinaNoticeList(Wow.Tv.Middle.Model.Db49.wowtv.Board.IntegratedBoardCondition condition);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IKvinaService/KvinaNoticeList", ReplyAction="http://tempuri.org/IKvinaService/KvinaNoticeListResponse")]
        System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Common.ListModel<Wow.Tv.Middle.Model.Db49.wowtv.Kvina.KvinaNoticeList>> KvinaNoticeListAsync(Wow.Tv.Middle.Model.Db49.wowtv.Board.IntegratedBoardCondition condition);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IKvinaService/KvinaNoticeListLinq", ReplyAction="http://tempuri.org/IKvinaService/KvinaNoticeListLinqResponse")]
        Wow.Tv.Middle.Model.Common.ListModel<Wow.Tv.Middle.Model.Db49.wowtv.TAB_NOTICE> KvinaNoticeListLinq(Wow.Tv.Middle.Model.Db49.wowtv.Board.IntegratedBoardCondition condition);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IKvinaService/KvinaNoticeListLinq", ReplyAction="http://tempuri.org/IKvinaService/KvinaNoticeListLinqResponse")]
        System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Common.ListModel<Wow.Tv.Middle.Model.Db49.wowtv.TAB_NOTICE>> KvinaNoticeListLinqAsync(Wow.Tv.Middle.Model.Db49.wowtv.Board.IntegratedBoardCondition condition);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IKvinaService/KvinaNoticeView", ReplyAction="http://tempuri.org/IKvinaService/KvinaNoticeViewResponse")]
        Wow.Tv.Middle.Model.Db49.wowtv.Kvina.KvinaNoticeView KvinaNoticeView(int seq);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IKvinaService/KvinaNoticeView", ReplyAction="http://tempuri.org/IKvinaService/KvinaNoticeViewResponse")]
        System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db49.wowtv.Kvina.KvinaNoticeView> KvinaNoticeViewAsync(int seq);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IKvinaService/KvinaNoticeViewLinq", ReplyAction="http://tempuri.org/IKvinaService/KvinaNoticeViewLinqResponse")]
        Wow.Tv.Middle.Model.Db49.wowtv.TAB_NOTICE KvinaNoticeViewLinq(int seq);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IKvinaService/KvinaNoticeViewLinq", ReplyAction="http://tempuri.org/IKvinaService/KvinaNoticeViewLinqResponse")]
        System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db49.wowtv.TAB_NOTICE> KvinaNoticeViewLinqAsync(int seq);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IKvinaService/KvinaNoticeWriteProc", ReplyAction="http://tempuri.org/IKvinaService/KvinaNoticeWriteProcResponse")]
        void KvinaNoticeWriteProc(string title, string content, string user_name);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IKvinaService/KvinaNoticeWriteProc", ReplyAction="http://tempuri.org/IKvinaService/KvinaNoticeWriteProcResponse")]
        System.Threading.Tasks.Task KvinaNoticeWriteProcAsync(string title, string content, string user_name);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IKvinaService/KvinaNoticeWriteProcLinq", ReplyAction="http://tempuri.org/IKvinaService/KvinaNoticeWriteProcLinqResponse")]
        void KvinaNoticeWriteProcLinq(Wow.Tv.Middle.Model.Db49.wowtv.TAB_NOTICE model);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IKvinaService/KvinaNoticeWriteProcLinq", ReplyAction="http://tempuri.org/IKvinaService/KvinaNoticeWriteProcLinqResponse")]
        System.Threading.Tasks.Task KvinaNoticeWriteProcLinqAsync(Wow.Tv.Middle.Model.Db49.wowtv.TAB_NOTICE model);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IKvinaService/KvinaNoticeWriteEdit", ReplyAction="http://tempuri.org/IKvinaService/KvinaNoticeWriteEditResponse")]
        void KvinaNoticeWriteEdit(int seq, string title, string content, string user_name);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IKvinaService/KvinaNoticeWriteEdit", ReplyAction="http://tempuri.org/IKvinaService/KvinaNoticeWriteEditResponse")]
        System.Threading.Tasks.Task KvinaNoticeWriteEditAsync(int seq, string title, string content, string user_name);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IKvinaService/KvinaNoticeDelete", ReplyAction="http://tempuri.org/IKvinaService/KvinaNoticeDeleteResponse")]
        void KvinaNoticeDelete(int seq);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IKvinaService/KvinaNoticeDelete", ReplyAction="http://tempuri.org/IKvinaService/KvinaNoticeDeleteResponse")]
        System.Threading.Tasks.Task KvinaNoticeDeleteAsync(int seq);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IKvinaService/KvinaNoticeDeleteLinq", ReplyAction="http://tempuri.org/IKvinaService/KvinaNoticeDeleteLinqResponse")]
        void KvinaNoticeDeleteLinq(int seq);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IKvinaService/KvinaNoticeDeleteLinq", ReplyAction="http://tempuri.org/IKvinaService/KvinaNoticeDeleteLinqResponse")]
        System.Threading.Tasks.Task KvinaNoticeDeleteLinqAsync(int seq);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IKvinaService/KvinaPaymentAPI", ReplyAction="http://tempuri.org/IKvinaService/KvinaPaymentAPIResponse")]
        int[] KvinaPaymentAPI();
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IKvinaService/KvinaPaymentAPI", ReplyAction="http://tempuri.org/IKvinaService/KvinaPaymentAPIResponse")]
        System.Threading.Tasks.Task<int[]> KvinaPaymentAPIAsync();
    }
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    public interface IKvinaServiceChannel : Wow.Tv.Admin.KvinaService.IKvinaService, System.ServiceModel.IClientChannel {
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    public partial class KvinaServiceClient : System.ServiceModel.ClientBase<Wow.Tv.Admin.KvinaService.IKvinaService>, Wow.Tv.Admin.KvinaService.IKvinaService {
        
        public KvinaServiceClient() {
        }
        
        public KvinaServiceClient(string endpointConfigurationName) : 
                base(endpointConfigurationName) {
        }
        
        public KvinaServiceClient(string endpointConfigurationName, string remoteAddress) : 
                base(endpointConfigurationName, remoteAddress) {
        }
        
        public KvinaServiceClient(string endpointConfigurationName, System.ServiceModel.EndpointAddress remoteAddress) : 
                base(endpointConfigurationName, remoteAddress) {
        }
        
        public KvinaServiceClient(System.ServiceModel.Channels.Binding binding, System.ServiceModel.EndpointAddress remoteAddress) : 
                base(binding, remoteAddress) {
        }
        
        public Wow.Tv.Middle.Model.Common.ListModel<Wow.Tv.Middle.Model.Db49.wowtv.Kvina.KvinaNoticeList> KvinaNoticeList(Wow.Tv.Middle.Model.Db49.wowtv.Board.IntegratedBoardCondition condition) {
            return base.Channel.KvinaNoticeList(condition);
        }
        
        public System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Common.ListModel<Wow.Tv.Middle.Model.Db49.wowtv.Kvina.KvinaNoticeList>> KvinaNoticeListAsync(Wow.Tv.Middle.Model.Db49.wowtv.Board.IntegratedBoardCondition condition) {
            return base.Channel.KvinaNoticeListAsync(condition);
        }
        
        public Wow.Tv.Middle.Model.Common.ListModel<Wow.Tv.Middle.Model.Db49.wowtv.TAB_NOTICE> KvinaNoticeListLinq(Wow.Tv.Middle.Model.Db49.wowtv.Board.IntegratedBoardCondition condition) {
            return base.Channel.KvinaNoticeListLinq(condition);
        }
        
        public System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Common.ListModel<Wow.Tv.Middle.Model.Db49.wowtv.TAB_NOTICE>> KvinaNoticeListLinqAsync(Wow.Tv.Middle.Model.Db49.wowtv.Board.IntegratedBoardCondition condition) {
            return base.Channel.KvinaNoticeListLinqAsync(condition);
        }
        
        public Wow.Tv.Middle.Model.Db49.wowtv.Kvina.KvinaNoticeView KvinaNoticeView(int seq) {
            return base.Channel.KvinaNoticeView(seq);
        }
        
        public System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db49.wowtv.Kvina.KvinaNoticeView> KvinaNoticeViewAsync(int seq) {
            return base.Channel.KvinaNoticeViewAsync(seq);
        }
        
        public Wow.Tv.Middle.Model.Db49.wowtv.TAB_NOTICE KvinaNoticeViewLinq(int seq) {
            return base.Channel.KvinaNoticeViewLinq(seq);
        }
        
        public System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db49.wowtv.TAB_NOTICE> KvinaNoticeViewLinqAsync(int seq) {
            return base.Channel.KvinaNoticeViewLinqAsync(seq);
        }
        
        public void KvinaNoticeWriteProc(string title, string content, string user_name) {
            base.Channel.KvinaNoticeWriteProc(title, content, user_name);
        }
        
        public System.Threading.Tasks.Task KvinaNoticeWriteProcAsync(string title, string content, string user_name) {
            return base.Channel.KvinaNoticeWriteProcAsync(title, content, user_name);
        }
        
        public void KvinaNoticeWriteProcLinq(Wow.Tv.Middle.Model.Db49.wowtv.TAB_NOTICE model) {
            base.Channel.KvinaNoticeWriteProcLinq(model);
        }
        
        public System.Threading.Tasks.Task KvinaNoticeWriteProcLinqAsync(Wow.Tv.Middle.Model.Db49.wowtv.TAB_NOTICE model) {
            return base.Channel.KvinaNoticeWriteProcLinqAsync(model);
        }
        
        public void KvinaNoticeWriteEdit(int seq, string title, string content, string user_name) {
            base.Channel.KvinaNoticeWriteEdit(seq, title, content, user_name);
        }
        
        public System.Threading.Tasks.Task KvinaNoticeWriteEditAsync(int seq, string title, string content, string user_name) {
            return base.Channel.KvinaNoticeWriteEditAsync(seq, title, content, user_name);
        }
        
        public void KvinaNoticeDelete(int seq) {
            base.Channel.KvinaNoticeDelete(seq);
        }
        
        public System.Threading.Tasks.Task KvinaNoticeDeleteAsync(int seq) {
            return base.Channel.KvinaNoticeDeleteAsync(seq);
        }
        
        public void KvinaNoticeDeleteLinq(int seq) {
            base.Channel.KvinaNoticeDeleteLinq(seq);
        }
        
        public System.Threading.Tasks.Task KvinaNoticeDeleteLinqAsync(int seq) {
            return base.Channel.KvinaNoticeDeleteLinqAsync(seq);
        }
        
        public int[] KvinaPaymentAPI() {
            return base.Channel.KvinaPaymentAPI();
        }
        
        public System.Threading.Tasks.Task<int[]> KvinaPaymentAPIAsync() {
            return base.Channel.KvinaPaymentAPIAsync();
        }
    }
}