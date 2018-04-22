/* ���������� �����۸�Χѡ���� ���������� */

/**
 * @option{
 *     rangeHandler : '.filter-handle',
 *     changing : function(min,max){ },
 *     changed : function(min,max){ }
 * }
 *
 * ���ԣ�
 *     nowDrag
 *     ��ǰ�϶��Ļ��飬jQueryԪ��
 * 
 * ������
 *     renderOut(a,b)
 *     ��������������a��b�ٷֱȵ�λ��
 */
function RangeInput(o){

    var self=this, $rangeH=$(o.rangeHandler),
        $rangeH0=$rangeH.eq(0),
        $rangeH1=$rangeH.eq(1),
        oriL, oriX, //ÿ�ε�����֮���϶�֮ǰ���α��leftֵ������xֵ
        fned=o.changed || function(){},
        fning=o.changing || function(){},
        rangeLength=Math.abs( parseInt($rangeH0.css('left')) - parseInt($rangeH1.css('left')) ), //cssֵ
        rangeStart=Math.min( parseInt($rangeH0.css('left')), parseInt($rangeH1.css('left')) ), //css Leftֵ
        rangeMap, //�۸�ͽ��ȵ�ӳ���ϵ����ĩ����Ԫ�����ٽ�ֵ
        min, max; //�ٷֱȣ���С���

    this.int = function(){
        $rangeH.bind('mousedown touchstart',function(e){
            var $this=$(this);
            oriL=parseInt($this.css('left'));
            oriX=e.pageX||e.originalEvent.touches[0].pageX;
            self.nowDrag=$this;
            $(document).bind('mousemove touchmove', mousemoveHandler ).one('mouseup touchend', mouseupHandler );
        });

        $('div.filter-bar').bind('mousedown',function(e){
            if( $(e.target).hasClass('filter-handle') ) return;
            var perct, perct0, perct1, a, b,
                rangeStartOffset=parseInt($('div.filter-bar-bg').offset().left) + 4; 
                //�����������գ����ҳ�棬����λ�ã������ڵ��������ʱ�����λ�õĲ���
            
            perct=(e.pageX - rangeStartOffset)/rangeLength-0.01;

            if(perct>1){ perct=1; }
            perct0=( parseInt($rangeH0.css('left'))-rangeStart)/rangeLength;
            perct1=( parseInt($rangeH1.css('left'))-rangeStart)/rangeLength;

            if( Math.abs(perct-perct0) < Math.abs(perct-perct1) ){
                //rangeH0����rangeH1�������ƶ�H0
                a=Math.min(perct, perct1);
                b=Math.max(perct, perct1)
            }else{
                a=Math.min(perct, perct0);
                b=Math.max(perct, perct0)
            };

            self.renderOut(a, b);
            fned(a, b);
        }).css({
            visibility:'visible'
        });
    }

    function mouseupHandler(e){
        if( oriX!=(e.pageX||e.originalEvent.changedTouches[0].pageX) ){ 
            fned( Math.min(min, max), Math.max(min,max) );
        };
        self.nowDrag=null;
        $(document).unbind('mousemove touchmove', mousemoveHandler);
    }

    function mousemoveHandler(e){
        e.preventDefault();
        var cssL=(e.pageX||e.originalEvent.touches[0].pageX)-oriX+oriL, L0, L1,
            cssMin, cssMax;
        if(cssL<rangeStart){
            cssL=rangeStart;
        }else if(cssL>rangeLength){
            cssL=rangeLength;
        };
        self.nowDrag.css('left',cssL);
        L0=parseInt( $rangeH0.css('left') );
        L1=parseInt( $rangeH1.css('left') );
        cssMin=Math.min(L0,L1); //ԭʼ��css��left��ֵ
        cssMax=Math.max(L0,L1);
        min=(cssMin-rangeStart)/rangeLength; //�������İٷֱ�
        max=(cssMax-rangeStart)/rangeLength;
        self.renderOut(min, max);
        fning(min, max);
    }

    //���½���������ͼ
    this.renderOut = function (a,b){ //a��b�ǰٷ�������Ӧ������
        var priceMin, priceMax, labelTxt;

        if(!self.nowDrag){
            $rangeH0.css('left', a*rangeLength+rangeStart );
            $rangeH1.css('left', b*rangeLength+rangeStart );
        }; //��������ֶ��϶���ʱ�򣬸�����������������ͼ

        priceMin=Math.round(self.convertToPrice(a));
        priceMax=Math.round(self.convertToPrice(b));


        if(a===0){
            if(b==1){
                labelTxt='�۸���';
            }else if(b==0){
                labelTxt='2������';
            }else{
                labelTxt=priceMax+'������';
            }
        }else if(b===1){
            if(a===1){
                labelTxt='100������';
            }else{
                labelTxt=priceMin+'������';
            }
        }else if(priceMin==priceMax){
            labelTxt=priceMin+'��';
            if(self.nowDrag){
                $(self.nowDrag).css( 'left', $rangeH.not(self.nowDrag).css('left') ); //������ͬ��ʱ����ص�����
            }
        }else{
            labelTxt=priceMin+'-'+priceMax+'��';
        };
        labelTxt+='<em class="arrow-top"></em>';

        $('#priceFilter .filter-label')
            .css('left',(a+b)/2*(662)-20)
            .html(labelTxt);
        $('#priceFilter .filter-bar-progress').css({
            left:11+a*(662),
            width:(b-a)*(662)
        });

        if(a==0 && b==1){
            $('#priceFilter .f-price-all').addClass('current');
        }else{
            $('#priceFilter .f-price-all').removeClass('current');
        }
    }

    rangeMap=[
        [0,0],
        [1.5,0],
        [5,0.06],
        [10,0.15],
        [100,0.94],
        [100.5,1],
        [101,1]
    ];

    //����С��->��Ǯ
    this.convertToPrice = function (c){
        var p,i,now,r0,r1;
        if(c<=rangeMap[0][1]){
            p=rangeMap[0][0]
        }else if(c>=rangeMap[rangeMap.length-1][1]){
            p=rangeMap[rangeMap.length-1][0]
        }else{
            for (i = 1; i < rangeMap.length-1; i++) {
                if(c<rangeMap[i][1]){
                    now=i;
                    break;
                };
            };
            r0=rangeMap[now-1];
            r1=rangeMap[now];
            p=(c-r0[1])/(r1[1]-r0[1])*(r1[0]-r0[0])+r0[0];
        };
        return p;
    }

    //��Ǯ->����С��
    this.convertToPercent = function(p){
        var c,i,now,r0,r1;
        if(p<=rangeMap[1][0]){
            c=rangeMap[1][1]
        }else if(p>=rangeMap[rangeMap.length-2][0]){
            c=rangeMap[rangeMap.length-2][1]
        }else{
            for (i = 2; i < rangeMap.length-1; i++) {
                if(p<rangeMap[i][0]){
                    now=i;
                    break;
                };
            };
            r0=rangeMap[now-1];
            r1=rangeMap[now];
            c=(p-r0[0])/(r1[0]-r0[0])*(r1[1]-r0[1])+r0[1];
        };
        return c;
    }

}

/* ���������� �����۸�Χѡ���� ���������� */

/* ���������� ����ѡ�۸� ���������� */
var priceFilter = new RangeInput({
    rangeHandler : '#priceFilter .filter-handle',
    changing : function(min,max){           
        
    },
    changed : function(min,max){
        var minPrice = Math.round(priceFilter.convertToPrice(min));
        var maxPrice = Math.round(priceFilter.convertToPrice(max));
        
        slideCommit(minPrice,maxPrice);
    }
});

priceFilter.int();

var lowprice = $('#ps').val();
var highprice = $('#pe').val();

if(lowprice && highprice){
    priceFilter.renderOut(priceFilter.convertToPercent(lowprice),priceFilter.convertToPercent(highprice));
}else if(lowprice){
    priceFilter.renderOut(priceFilter.convertToPercent(lowprice),1);
}else if(highprice){
    priceFilter.renderOut(0,priceFilter.convertToPercent(highprice));
}else{
    handlePresetPrice();
};

//ѡ�б�ǩ of ��Ԥ��۸�
(function handlePriceTag(){
    var map;
    if(!window.MAP_SEL){
        map=[[0,5],[8,10],[10,15],[15,20],[20,25],[25,35],[50,100],[100,0]];    
    }else{
        map=MAP_SEL;  
    }
    
    for (var i = 0; i < map.length; i++) {
        if( map[i][0]==lowprice*1 && map[i][1]==highprice*1 ){break;}
    };
    $('#priceFilter div.filter-links a').eq(i).addClass('s').siblings('a').removeClass('s');
})();

//��������Ⱦ of Ԥ�賣�ü۸�ҳ��
function handlePresetPrice(){
    var map;
    if(!window.MAP_PRiCELOAD){
        map=[[0,5],[8,10],[10,15],[15,20],[20,25],[25,35],[50,100],[100,0]];    
    }else{
        map=MAP_PRiCELOAD;  
    }
    
    var map = {
            '1' : [0, 0, 5],
            '2' : [-1, 5, 8],
            '3' : [1, 8, 10],
            '4' : [2, 10, 15],
            '5' : [3, 15, 20],
            '6' : [4, 20, 25],
            '7' : [5, 25, 35],
            '8' : [-1, 35, 50],
            '9' : [6, 50, 100],
            '10': [7, 100, 101]
        };

    var a=location.href.match(/\/q-.*p(\d+).*/i);
    if(a && map[a[1]]){
        priceFilter.renderOut(priceFilter.convertToPercent(map[a[1]][1]),priceFilter.convertToPercent(map[a[1]][2]));
        // $('#priceFilter .filter-links a').eq(map[a[1]][0]).addClass('s');
    }else{
        priceFilter.renderOut(0,1);
    }
}

$('#priceFilter .f-price-all').click(function() {
    priceFilter.renderOut(0,1);
    $(this).addClass('current');
 })
/* ���������� ����ѡ�۸� ���������� */
function slideCommit(fromPri,toPri) {
    var startString = $('#startUrl').val();
    var endString = $('#endUrl').val();
    var url= startString;

    if(fromPri===0){
        fromPri=-1;
    }else if(fromPri===101){
        fromPri=100;
    };

    if(toPri===0){
        toPri=2;
    }else if(toPri===101){
        toPri=-1;
    };    

    if(fromPri!=-1){
        if(url.substring(url.length-1,url.length) == '/'){
            url += "ps" + fromPri;
        }else{
            url += "-ps" + fromPri;
        }
    };

    if(toPri!=-1){
        url += "-pe" + toPri;
    };

    url += endString;
    document.location.href = url;
    return true;

    alert("��ѡ��һ�����ʵļ۸�Χ��");
    return false;
} 