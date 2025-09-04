function left(s, c) {
    return s.substr(0, c);
}
const setctrl = function (payload, self) {
    let vHtml = `
$(function(){
    //  뒤로가기 추가
    window.onpopstate = function(event) {
        
        if(Cm.validation.isNull(event.state)){// 첫 페이지 로드시 state가 없음으로 전 페이지로 이동
            location.replace(document.referrer); 
        
        }else{
        
            if(Cm.validation.isNull(event.state.searchVo)){ // state에 searchVo가 없을 때
                ${payload.SampleSm}App.pageVo = ${payload.SampleSm}App.clearVo;	 			
            } else {				
                ${payload.SampleSm}App.pageVo = event.state.searchVo;
            }
            
            ${payload.SampleSm}App.params.pageIndex = event.state.pageIndex;
            ${payload.SampleSm}App.lists('reloadBack');
        }  
    };

    $(document).on("click","#checkAll",function (event) {
        if($("#checkAll").prop("checked")) { 
            //해당화면에 전체 checkbox들을 체크해준다
            $("#dataTable input[type=checkbox]").prop("checked",true); 
            // 전체선택 체크박스가 해제된 경우 
            } else { 
                //해당화면에 모든 checkbox들의 체크를해제시킨다. 
                $("#dataTable input[type=checkbox]").prop("checked",false); 
            }

    });
    $( document ).ajaxStop(function() {
        console.log('== ajaxStop ')
        $("#load_cont").addClass("d-none");
    });
    
    $( document ).ajaxStart(function() {
        console.log('== ajaxStart ')
        $("#load_cont").removeClass("d-none");
    });
})

Vue.component('datepicker', {
  template: '<input/>',
  props: [ 'dateFormat' ],
  mounted: function() {
    var self = this;
    $(this.$el).datepicker({
        dateFormat: 'yy-mm-dd',
        prevText: '이전 달',
        nextText: '다음 달',
        monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        dayNames: ['일', '월', '화', '수', '목', '금', '토'],
        dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
        dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
        showMonthAfterYear: true,
        yearSuffix: '년',
        // timepicker 설정
        // timeFormat:'HH:mm',
        // controlType:'select',
        // oneLine:true,
        // minDate: 0,
        onSelect: function(d){self.$emit('update-date',d)},
        // buttons: {
        // 	showToday: true,
        // 	showClear: true
        // }
      });
  },
  beforeDestroy: function(){$(this.$el).datepicker('hide').datepicker('destroy')}
});

Vue.component('v-pagination', window['vue-plain-pagination']);
`;
    return vHtml;
}
module.exports = {
    getCtrl: setctrl
}