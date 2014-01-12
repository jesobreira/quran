var popupState = 0;

$(document).ready(function() {
	$("#closePopup").button();
	$(window).scroll(onscrollwin);
});

var lastVerse;
function onscrollwin() {
	var topoffset = $(document).scrollTop();
	var elemento = document.elementFromPoint(1, 40);
	elementoID = parseInt(elemento.id.replace("v_", ""));
	if(elementoID!=lastVerse) {
		$("#verseSlider").unbind('change');
		$("#verseSlider").val(elementoID);
		$('#verseSlider').slider('refresh');
		$("#verseSlider").change(onsliderchanging);
		lastVerse = elementoID;
	}
	
	if(!isScrolledIntoView($("#popupDiv"))) {
		$("#popupDiv").popup("close");
	}
}

function gosura(id) {
	$("#footerSlider").fadeIn();
	if(id==0) return false;
	var resultado = '<ul id="display" data-role="listview" class="ui-listview">';
	var ayats = quran[id].length-1
	if(id!=1) { 
		resultado += '<li id="v_0" class="ui-li ui-li-static ui-btn-up-c" onClick="javascript:jqmalert(\''+quran_ar[1][1].replace('"', '&quot;')+'\');"><b>0.</b> Em nome de Allah, o Clemente, o Misericordioso';
		resultado += "</li>";
	}
	for(i = 1; i <= ayats; i++) {
		resultado += '<li id="v_'+i+'" class="ui-li ui-li-static ui-btn-up-c" onClick="javascript:jqmalert(\''+quran_ar[id][i].replace('"', '&quot;')+'\');"><b>'+i+".</b> "+quran[id][i]+"";
		resultado += "</li>";
	}
	$("#verseSlider").unbind('change');
	$("#verseSlider").attr("max", ayats);
	if(id==1) {
		$('#verseSlider').val(1);
		$("#verseSlider").attr("min", 1);
	} else {
		$('#verseSlider').val(0);
		$("#verseSlider").attr("min", 0);
	}
	$('#verseSlider').slider('refresh');
	$("#verseSlider").change(onsliderchanging);
	resultado += "</ul>";
	$("#suratext").html(resultado);
}

function onsliderchanging() {
	versescr = $("#verseSlider").val();
	$(window).unbind('scroll');
	$('html, body').stop().animate({
		scrollTop: parseInt(document.getElementById('v_'+versescr).offsetTop)
	}, 100);
	$(window).scroll(onscrollwin);
}

function getarabtext(sura, verso) {
	alert(quran_ar[sura][verso]);
}

function jqmalert(texto) {
	$("#closePopup").css('display', 'block');
	$("#popupText").text(texto);
	$("#popupDiv").popup({positionTo: "origin", transition: "pop"});
	$("#popupDiv").popup("open");
	popupState = 1;
}

function isScrolledIntoView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return ((elemBottom >= docViewTop) && (elemTop <= docViewBottom)
      && (elemBottom <= docViewBottom) &&  (elemTop >= docViewTop) );
}