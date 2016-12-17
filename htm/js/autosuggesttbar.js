// Parâmetros
var g1='5'; //Quantidade de itens do grupo g1(Termos), Padrão 5, Máximo 9, 0 Não exibe
var g2='5'; //Quantidade de itens do grupo g2(Páginas), Padrão 3, Máximo 9, 0 Não exibe
var g3='5'; //Quantidade de itens do grupo g3(Produtos), Padrão 5, Máximo 9, 0 Não exibe
var g4='5'; //Quantidade de itens do grupo g4(Notícias), Padrão 3, Máximo 9, 0 Não exibe

jQuery.noConflict();
jQuery(function (jQuery) {
                  
jQuery.widget( "custom.autocomplete", jQuery.ui.autocomplete, {
    _renderMenu: function( ul, items ) {
        var self = this,
            currentCategory = "";
        jQuery.each( items, function( index, item ) {
            if ( item.category != currentCategory ) {
                ul.append( "<li class='ui-autocomplete-category'><span class='as-categoria'>" + item.category + "</span></li>" );
                currentCategory = item.category;
            }
            self._renderItem( ul, item );
        });
    }
});

jQuery("#autocomplete-toolbar").autocomplete({
  select: function( event, ui ) { 
    if (ui.item.q){
      jQuery('#autocomplete-form-toolbar').submit();
      return false;           
    }
    if (ui.item.c){
      var idProducts = ui.item.id;
      window.location.href = "/prod,idloja,"+FC$.IDLoja+",idproduto,"+idProducts;
      return false;           
    }
    if (ui.item.u){
      window.location.href = ui.item.u.replace("&amp;","&");
      return false;           
    }
    if(ui.item.s){
      var idNews = ui.item.id;
      window.location.href = "/news,idloja,"+FC$.IDLoja+",idnoticia,"+idNews;
      return false;           
    }
  },
  focus: function(event,ui) {
      jQuery('input#autocomplete-toolbar').val(ui.item.label
                .replace("&quot;",'"')
                .replace("&apos;","'")
                .replace("&amp;","&")
                .replace("&lt;","<")
                .replace("&gt;",">")
                .replace("&#192;","À")
                .replace("&#193;","Á")
                .replace("&#194;","Â")
                .replace("&#195;","Ã")
                .replace("&#196;","Ä")
                .replace("&#197;","Å")
                .replace("&#198;","Æ")
                .replace("&#199;","Ç")
                .replace("&#200;","È")
                .replace("&#201;","É")
                .replace("&#202;","Ê")
                .replace("&#203;","Ë")
                .replace("&#204;","Ì")
                .replace("&#205;","Í")
                .replace("&#206;","Î")
                .replace("&#207;","Ï")
                .replace("&#208;","Ð")
                .replace("&#209;","Ñ")
                .replace("&#210;","Ò")
                .replace("&#211;","Ó")
                .replace("&#212;","Ô")
                .replace("&#213;","Õ")
                .replace("&#214;","Ö")
                .replace("&#216;","Ø")
                .replace("&#217;","Ù")
                .replace("&#218;","Ú")
                .replace("&#219;","Û")
                .replace("&#220;","Ü")
                .replace("&#221;","Ý")
                .replace("&#222;","Þ")
                .replace("&#223;","ß")
                .replace("&#224;","à")
                .replace("&#225;","á")
                .replace("&#226;","â")
                .replace("&#227;","ã")
                .replace("&#228;","ä")
                .replace("&#229;","å")
                .replace("&#230;","æ")
                .replace("&#231;","ç")
                .replace("&#232;","è")
                .replace("&#233;","é")
                .replace("&#234;","ê")
                .replace("&#235;","ë")
                .replace("&#236;","ì")
                .replace("&#237;","í")
                .replace("&#238;","î")
                .replace("&#239;","ï")
                .replace("&#240;","ð")
                .replace("&#241;","ñ")
                .replace("&#242;","ò")
                .replace("&#243;","ó")
                .replace("&#244;","ô")
                .replace("&#245;","õ")
                .replace("&#246;","ö")
                .replace("&#248;","ø")
                .replace("&#249;","ù")
                .replace("&#250;","ú")
                .replace("&#251;","û")
                .replace("&#252;","ü")
                .replace("&#253;","ý")
                .replace("&#254;","þ")
                .replace("&#255;","ÿ")
                );
      return false;
  },                                          
  source: function (request, response) {
      jQuery.ajax({
          url: "/autosuggest.asp?idloja="+ FC$.IDLoja +"&format=1&q="+ request.term +"&g1="+g1+"&g2="+g2+"&g3="+g3+"&g4="+g4,
          dataType: "json",
          type: "GET",                     
          success: function (data) {
            var json0 = data.SearchTerms;
            var json1 = data.Products;
            var json2 = data.RelatedPages;
            var json3 = data.News;
            
            
            if(jQuery.isArray(json0)) {
                json0 = json0;
            }else{
              json0 = [  ];
            };                          
            if(jQuery.isArray(json1)) {
                json1 = json1;
            }else{
              json1 = [  ];
            };                          
            if(jQuery.isArray(json2)) {
                json2 = json2;
            }else{
              json2 = [  ];
            };                          
            if(jQuery.isArray(json3)) {
                json3 = json3;
            }else{
              json3 = [  ];
            };
                                                                  
            var json = [].concat(json0,json1,json2,json3);
            
                                
              //console.log(json);
            
            response(jQuery.map(json, function (item) {
                return {
                    category: item.category,
                    //Termos
                    t: item.label,
                    q: item.q,
                    //Produtos
                    nm: item.label,
                    id: item.id,
                    c: item.c,
                    im: item.im,
                    op: item.op,
                    fp: item.fp,
                    v: item.v,
                    //Paginas  
                    p: item.label,
                    u: item.u,
                    //Noticias
                    id: item.id,
                    t:item.label,
                    s: item.s,
                    d: item.d,
                    label: item.label
                    }
            }))                         

          },
          error: function (a, b, c) {
              debugger;
          }
      });
  },
  minLength: 3
}).data("autocomplete")._renderItem = function(ul, item) {

    jQuery('li.active:even').css('background-color', '#f6f6f6');

    //Termos
    if (item.q){      
      var sPlural = '';
      if (item.q >1){sPlural = 's';}else {sPlural = '&nbsp;&nbsp;';}
      var t = item.label.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + jQuery.ui.autocomplete.escapeRegex(this.term) + ")(?![^<>]*>)(?![^&;]+;)", "gi"), "<strong>$1</strong>");           
      return jQuery("<li class='active'></li>")                
      .data("item.autocomplete", item)
      .append("<a><table width='100%'><tr><td width='90%' id='as-nome-termos'><span>"+t+"</span></td><td align='right' id='as-qtd-termos'><span>"+item.q+"&nbsp;Produto"+sPlural+"&nbsp;</span></td></tr></table></a>")
      .appendTo(ul);                    
    }

    //Produtos
    if (item.c){
      if (item.fp == 0){
        valor = "Consulte-nos";
      }else{
        valor = FormatPrice(item.fp,FC$.Currency);
      }
      if(item.fp!=item.op && item.op!=0.00){
        sSale="<span style='background-color:#65984d;color:#ffffff;padding:3px;' class='SearchSaleFC'>&nbsp;"+sF$.fnFormatNumber(((item.op-item.fp)/item.op)*100)+"%&nbsp;off&nbsp;</span>&nbsp;&nbsp;";}
      else{
        sSale=""
      }
      var nm = item.label.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + jQuery.ui.autocomplete.escapeRegex(this.term) + ")(?![^<>]*>)(?![^&;]+;)", "gi"), "<strong>$1</strong>");
      return jQuery("<li class='active prods-itens'></li>")
      .data("item.autocomplete", item)
      .append("<a><table width='100%'><tr height='75px'><td align=center class='SearchIMGFC'><span><img src='"+ FC$.PathPrd  + item.im + "' id='as-img-prod' style='vertical-align:middle;'></span></td><td width='55%'><div id='as-nomecat-prod'><span id='as-nome-prod'>" + nm + "</span><br/><span id='as-cat-prod'>" + item.c + "</span></div></td><td width=25 class='as-sale'>"+ sSale +"</td><td align='right' id='as-valor-prod' nowrap='nowrap'><span>" + valor +"</span></td></tr></table></a>")
      .appendTo(ul);
    }   

    //Paginas            
    if (item.u){           
      var p = item.label.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + jQuery.ui.autocomplete.escapeRegex(this.term) + ")(?![^<>]*>)(?![^&;]+;)", "gi"), "<strong>$1</strong>");           
      return jQuery("<li class='active'></li>")
      .data("item.autocomplete", item)
      .append("<a><table width='100%'><tr valign='0'><td id='as-nome-pag'><a href='" + item.u + "'>" + p + "</td></tr></table></a>")
      .appendTo(ul);                    
    }

    //Noticias
    if (item.s){        
      var t = item.label.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + jQuery.ui.autocomplete.escapeRegex(this.term) + ")(?![^<>]*>)(?![^&;]+;)", "gi"), "<strong>$1</strong>");           
      return jQuery("<li class='active'></li>")
      .data("item.autocomplete", item)
      .append("<a><table width='100%'><tr valign='0'><td width='65%' id='as-nome-not'>" + t + "</td><td align='right' id='as-data-not'>" + item.d + "</td></tr></table></a>")
      .appendTo(ul);                    
    }
  }
});
