(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-88fa0cc4"],{"1f57":function(e,t,n){"use strict";var a=n("d4ec"),r=n("bee2"),c=n("bc3a"),s=n.n(c);function u(){var e=JSON.parse(localStorage.getItem("user"));return e&&e.accessToken?{Authorization:"Bearer "+e.accessToken}:{}}var o="http://localhost:8089/api/user/",l=function(){function e(){Object(a["a"])(this,e)}return Object(r["a"])(e,[{key:"addTodo",value:function(e,t){return s.a.post(o+e+"/todos",{text:t,headers:u()})}},{key:"getTodos",value:function(e){return s.a.get(o+e+"/todos",{headers:u()})}},{key:"removeTodo",value:function(e,t){return s.a.delete(o+e+"/todos/"+t,{headers:u()})}},{key:"toggleTodo",value:function(e,t){return s.a.put(o+e+"/todos/"+t+"/toggle",{headers:u()})}},{key:"addEntry",value:function(e,t,n){return s.a.post(o+e+"/entries",{title:t,text:n,headers:u()})}},{key:"getEntries",value:function(e){return s.a.get(o+e+"/entries",{headers:u()})}},{key:"removeEntry",value:function(e,t){return s.a.delete(o+e+"/entries/"+t,{headers:u()})}},{key:"editEntry",value:function(e,t,n,a){return s.a.put(o+e+"/entries/"+t,{title:n,text:a,headers:u()})}},{key:"getActivity",value:function(e){return s.a.get(o+e+"/activity",{headers:u()})}},{key:"addCallback",value:function(e,t,n){return s.a.post(o+e+"/callbacks",{title:t,text:n,headers:u()})}},{key:"getCallbacks",value:function(e){return s.a.get("http://localhost:8089/api/admin/"+e+"/callbacks",{headers:u()})}}]),e}();t["a"]=new l},5535:function(e,t,n){"use strict";n.r(t);var a=n("7a23"),r={class:"container"},c={class:"table"},s=Object(a["g"])("tr",null,[Object(a["g"])("th",null,"Тема"),Object(a["g"])("th",null,"Содержание"),Object(a["g"])("th",null,"Дата"),Object(a["g"])("th",null,"Email пользователя")],-1);function u(e,t,n,u,o,l){return Object(a["s"])(),Object(a["d"])("div",r,[Object(a["g"])("table",c,[s,(Object(a["s"])(!0),Object(a["d"])(a["a"],null,Object(a["y"])(o.content,(function(e){return Object(a["s"])(),Object(a["d"])("tr",{key:e.id},[Object(a["g"])("td",null,Object(a["C"])(e.title),1),Object(a["g"])("td",null,Object(a["C"])(e.text),1),Object(a["g"])("td",null,Object(a["C"])(e.date),1),Object(a["g"])("td",null,Object(a["C"])(e.email),1)])})),128))])])}n("d3b7"),n("25f0");var o=n("1f57"),l={name:"Admin",data:function(){return{content:"",idUser:0}},mounted:function(){var e=this;this.idUser=this.$store.state.auth.user.id,o["a"].getCallbacks(this.idUser).then((function(t){e.content=t.data}),(function(t){e.content=t.response&&t.response.data&&t.response.data.message||t.message||t.toString()}))}};l.render=u;t["default"]=l}}]);
//# sourceMappingURL=chunk-88fa0cc4.032a2766.js.map