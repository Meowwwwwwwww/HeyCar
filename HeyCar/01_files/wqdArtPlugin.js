$(function () {
    /* 加载更多 flag */
    var loadMoreFlag = 1;
    /**
     * 文章控件功能
     * @author Lx;
     */
    var artListPluginLx = {
        listNullStr: {
            articleNewsList1: [
                '<li class="list-cell artPlugin-no-data wqd-brc wqd-brw">',
                    '<span class="svg-box"></span>',
                    '<span class="newsTitle wqd-ff wqd-fs wqd-clr wqd-fw wqd-fst">暂没有数据</span>',
                    '<span class="view wqd-clr wqd-bgclr wqd-fw wqd-fst"></span>',
                '</li>'
            ].join(''),
            articleNewsList2: [
                '<div class="list-cell artPlugin-no-data">',
                    '<p class="title wqd-clr wqd-ff wqd-fs wqd-fw wqd-fst">暂没有数据</p>',
                    '<div class="imgGroup"></div>',
                    '<div class="footer">',
                        '<div class="fl"><span></span></div>',
                        '<div class="fr"></div>',
                    '</div>',
                    '<hr class="line wqd-brc wqd-brw">',
                '</div>'
            ].join(''),
            articleNewsList3: [
                '<div class="list-cell artPlugin-no-data">',
                    '<div class="right-con" style="margin-left:0;">',
                        '<p class="title wqd-clr wqd-ff wqd-fs wqd-fw wqd-fst">暂没有数据</p>',
                        '<p class="content wqd-clr wqd-ff wqd-fs wqd-fw wqd-fst"></p>',
                        '<div class="infoBar">',
                            '<div class="tags"></div>',
                            '<div class="time wqd-clr wqd-bgclr wqd-fw wqd-fst"></div>',
                            '<div class="info"></div>',
                        '</div>',
                    '</div>',
                    '<hr class="line wqd-brc wqd-brw">',
                '</div>'
            ].join(''),
            articleNewsList4: [
                '<div class="list-cell artPlugin-no-data">',
                    '<div class="right-con" style="margin-left:0;">',
                        '<p class="title wqd-clr wqd-ff wqd-fs wqd-fw wqd-fst">暂没有数据</p>',
                        '<p class="content wqd-clr wqd-ff wqd-fs wqd-fw wqd-fst"></p>',
                        '<div class="infoBar">',
                            '<div class="tags"></div>',
                            '<div class="time wqd-clr wqd-bgclr wqd-fw wqd-fst"></div>',
                            '<div class="info"></div>',
                        '</div>',
                    '</div>',
                    '<hr class="line wqd-brc wqd-brw">',
                '</div>'
            ].join('')
        },
        listFun: {
            articleNewsList1Fun: function () {
                var data = arguments[0], flagStr = arguments[1], index = arguments[2];
                var pageId = arguments[3];
                // 存放svg图形
                var svgArr = [
                    ['<svg fill="#ff3333" viewBox="0 0 200 200"><path d="M43.6,42.3L12.4,157.7h144l31.1-115.5H43.6z M112.3,133.3H97.6V80.6c-4.8,3.5-10.1,6.4-15.9,8.7V76   c6.1-2.8,11.7-6.1,17.1-9.9h13.6V133.3z"></path></svg>'].join(''),
                    ['<svg fill="#ff5c5c" viewBox="0 0 200 200"><path d="M43.6,42L12.4,157.5h144L187.6,42H43.6z M123.3,133.2H76.7v-13.3c1-1.2,3.6-3.6,7.8-7c16.3-13.8,24.3-23.3,24-28.4   c-0.5-5.4-3.2-8.2-8.1-8.5c-4.9,0.5-7.6,3.8-8.1,10H77.8c0.2-12.6,7.8-19.1,22.5-19.6c14.5,0.7,22,6.9,22.5,18.5   c0,7.6-7.1,17.4-21.4,29.2c-5.2,4.4-8.6,7.6-10.3,9.6h32.1V133.2z"></path></svg>'].join(''),
                    ['<svg fill="#ff9999" viewBox="0 0 200 200"><path d="M43.6,42L12.4,157.5h144L187.6,42H43.6z M99.5,133.2c-14.6,0-21.9-6.2-21.9-18.6h14.3c0.2,5.8,2.9,9.1,8,9.9   c5.1-0.5,7.9-3.8,8.4-9.9c-0.2-7.3-5.5-10.8-15.7-10.6v-9.1c10.7-0.2,16-3.7,15.7-10.2c-0.2-5.6-2.9-8.5-8-8.8   c-4.4,0.7-6.9,3.7-7.7,8.8H78.3c0.7-11.7,8-17.8,21.9-18.3c13.6,1.2,20.9,6.7,21.9,16.4c-0.2,8.8-4.4,14.1-12.4,16.1   c8.5,2.4,12.8,8.3,12.8,17.5C121.3,126.6,113.6,132.2,99.5,133.2z"></path></svg>'].join(''),
                    ['<svg fill="#cccccc" viewBox="0 0 200 200"><polygon points="101.4,108.1 101.4,84.3 85.2,108.1  "></polygon> <path d="M43.6,42.3L12.4,157.7h144l31.1-115.5H43.6z M124.9,119.1h-9.4v14.4h-14v-14.4H74.2v-12.8l27.2-39.7h14v41.6h9.4V119.1z"></path></svg>'].join(''),
                    ['<svg fill="#cccccc" viewBox="0 0 200 200"><path d="M43.6,42.3L12.4,157.7h144l31.1-115.5H43.6z M101.1,133.4c-14.2-0.3-21.5-6-22-17.2h14.2c0.7,5.2,3.5,8,8.2,8.2   c6-0.2,9.2-5,9.7-14.2c-0.5-7.5-3.6-11.5-9.3-12c-4,0.3-6.7,2.7-8.2,7.5l-14.2-0.4l1.9-38.9h40.3v9.3h-28l-0.7,17.6   c3.2-3.2,7.3-4.9,12.3-4.9c13.2,0.5,19.9,8.1,20.2,22.8C124.1,125.1,116,132.4,101.1,133.4z"></path></svg>'].join(''),
                    ['<svg fill="#cccccc" viewBox="0 0 200 200"><path d="M100.5,99.9c-5.4,0.2-8.3,4.3-8.8,12.1c0.5,8.1,3.4,12.2,8.8,12.5c5.6-0.2,8.6-4.4,8.8-12.5   C109.1,104.2,106.1,100.2,100.5,99.9z"/><path d="M43.6,42.3L12.4,157.7h144l31.1-115.5H43.6z M118.5,126.3c-4.9,4.4-11.1,6.7-18.7,7c-15.2,0-22.7-9.2-22.7-27.5   c-0.7-26.6,7.8-39.9,25.7-39.6c12.7,0.7,19.2,6.5,19.4,17.2h-13.9c0-2.9-0.6-5-1.8-6.2c-1.5-1-3.3-1.5-5.5-1.5   c-5.9,0.2-8.9,6.7-9.2,19.4c2.9-3.2,7-4.8,12.1-4.8c12.7,0.7,19.4,7.5,20.2,20.2C124,116.9,122.2,122.2,118.5,126.3z"/></svg>'].join(''),
                    ['<svg fill="#cccccc" viewBox="0 0 200 200"><path d="M44.1,42.3L12.9,157.7h144l31.1-115.5H44.1z M124,78.7l-20.9,54.6H88.8l21.6-56.1h-30v-11H124V78.7z"/></svg>'].join(''),
                    ['<svg fill="#cccccc" viewBox="0 0 200 200"><path d="M100.5,104.2c-5.8,0.5-8.9,3.9-9.1,10.2c0.2,6.6,3.4,10,9.5,10.2c5.6-0.5,8.6-3.9,9.1-10.2   C109.5,107.8,106.3,104.4,100.5,104.2z"/><path d="M100.1,76.2c-5.6,0.5-8.5,3.3-8.7,8.4c0.2,5.6,3.5,8.5,9.8,8.7c5.6-0.5,8.5-3.4,8.7-8.7C109.7,79.2,106.5,76.4,100.1,76.2z   "/><path d="M44.1,42.3L12.9,157.7h144l31.1-115.5H44.1z M100.5,133.3c-15-0.5-22.8-6.7-23.3-18.6c0.5-8,5-13.3,13.5-16v-0.4   c-8.3-2.4-12.4-7.3-12.4-14.6c1-10.2,8.4-15.9,22.2-17.1c14.6,0.7,22.1,6.4,22.6,17.1c-0.7,7.8-5,12.6-12.7,14.6   c8.7,2.4,13.2,7.9,13.5,16.4C122.8,126.4,115.1,132.6,100.5,133.3z"/></svg>'].join(''),
                    ['<svg fill="#cccccc" viewBox="0 0 200 200"><path d="M103.4,76.9c-6.1,0-9.1,3.9-9.1,11.7c0,7.3,3,11,9.1,11c5.4-0.2,8.2-3.9,8.4-11C111.6,81.1,108.8,77.2,103.4,76.9z"/><path d="M44.3,43.1L13.1,158.6h144l31.1-115.5H44.3z M102.3,134.3c-14.1,0.2-21.3-5.4-21.6-16.8H95c1,5.4,3.3,8,6.9,8   c7.3,0,10.6-6.8,9.9-20.5c-3.7,2.9-7.9,4.3-12.8,4c-11.7-1.2-18.2-7.8-19.4-19.7c1-13.6,8.6-21,23-21.9   c15.8-0.2,23.6,9.4,23.4,28.9C127.1,122.1,119.2,134.8,102.3,134.3z"/></svg>'].join(''),
                    ['<svg fill="#cccccc" viewBox="0 0 200 200"><path d="M121.9,77c-5.6,0.2-8.4,8.4-8.4,24.6c0,15.9,2.8,24,8.4,24.2c5.6-0.2,8.4-8.3,8.4-24.2C130.3,85.4,127.5,77.2,121.9,77z"/><path d="M44.3,43.1L13.1,158.6h144l31.1-115.5H44.3z M88.2,133.8H73.9v-51c-4.6,3.4-9.8,6.2-15.4,8.4V78.4   c5.9-2.7,11.4-5.9,16.5-9.5h13.2V133.8z M121.5,134.5c-14.4-0.2-21.9-11.2-22.4-33c0.5-22.5,7.9-33.9,22.4-34.1   c15.2,0.2,23,11.6,23.5,34.1C144.8,123.3,136.9,134.3,121.5,134.5z"/></svg>'].join('')
                ];

                var news = data.news;
                return [
                '<a href="page_'+pageId + '_' +news.id+'.html">',
                    '<li class="list-cell wqd-brc wqd-brw">',
                        '<span class="svg-box">',
                            svgArr[index] || (index+1),
                        '</span>',
                        '<span class="newsTitle wqd-ff wqd-fs wqd-clr wqd-fw wqd-fst">',
                            (news.isRecommend == "YES" ? '<em class="recommend">推荐</em>' : ''),
                            news.title,
                        '</span>',
                        '<span class="view wqd-clr wqd-bgclr wqd-fw wqd-fst">',
                            '<i>',
                                '<svg viewBox="0 0 48 48"><path class="wqd-bgclr" d="M23.4,15.9c-4.2,0-7.7,3.6-7.7,8s3.5,8,7.7,8c1.2,0,2.3-0.3,3.3-0.8c0.5-0.2,0.7-0.9,0.5-1.4c-0.2-0.5-0.8-0.7-1.3-0.5    c-0.8,0.4-1.6,0.6-2.5,0.6c-3.1,0-5.7-2.7-5.7-5.9s2.6-5.9,5.7-5.9c3.1,0,5.7,2.7,5.7,5.9c0,0.6-0.1,1.1-0.2,1.6    c-0.1,0.6,0.1,1.1,0.7,1.3c0.5,0.2,1.1-0.2,1.2-0.7c0.2-0.7,0.3-1.5,0.3-2.2C31.1,19.5,27.7,15.9,23.4,15.9z M19.8,22.4    c-0.2,0.5-0.3,1-0.3,1.5c0,0.3,0.2,0.5,0.5,0.5c0.3,0,0.5-0.2,0.5-0.5c0-0.4,0.1-0.7,0.2-1.1c0.4-1.2,1.5-1.9,2.7-1.9    c0.3,0,0.5-0.2,0.5-0.5c0-0.3-0.2-0.5-0.5-0.5C21.8,19.8,20.4,20.9,19.8,22.4z M46.2,22.6C40.5,15.2,32.1,9.7,23.4,9.7    c-8.7,0-15.9,5.4-21.6,12.8c-0.1,0.2-0.2,0.4-0.2,0.6v1.3c0,0.2,0.1,0.5,0.2,0.6C7.5,32.6,14.7,38,23.4,38c8.7,0,17-5.4,22.8-12.9    c0.1-0.2,0.2-0.4,0.2-0.6v-1.3C46.4,23,46.4,22.8,46.2,22.6z M44.4,24.2c-5.4,6.8-13,11.8-21,11.8s-14.5-5-19.8-11.8v-0.6    C9,16.8,15.4,11.8,23.4,11.8c8,0,15.6,5,21,11.8C44.4,23.6,44.4,24.2,44.4,24.2z"></path></svg>',
                            '</i>'+(news.initialPageView+news.pageView)+' </span>',
                    '</li>',
                '</a>'
                ].join('');
            },
            articleNewsList2Fun: function () {
                var data = arguments[0], flagStr = arguments[1], index = arguments[2];
                var pageId = arguments[3];
                var news = data.news;

                /**
                 * 获取标签字符串
                 * @param {[Array]} arr 传入标签数据数组
                 */
                function getTags (arr) {
                    var i = 0, str='';
                    for (;i<arr.length;i++) {
                        str += '<span data-tagid="'+arr[i].id+'" class="tag wqd-clr wqd-bgclr wqd-fw wqd-fst wqd-ff">'+arr[i].name+'</span>';
                    }
                    return str;
                }

                return [
                '<a href="page_'+pageId + '_' +news.id+'.html">',
                    '<div class="list-cell">',
                        '<p class="title wqd-clr wqd-ff wqd-fs wqd-fw wqd-fst">',
                            (news.isRecommend == "YES" ? '<em class="recommend">推荐</em>' : ''),
                            news.title,
                        '</p>',
                        '<div class="imgGroup">',
                            '<div class="img-box wqd-h"><img src="' + (!!news.coverPicture.split(',')[0] ? (/(http)|(https)/gi.test(news.coverPicture.split(',')[0])?(news.coverPicture.split(',')[0]):(CSSURLPATH + news.coverPicture.split(',')[0])) : '/images/news-demo/wqd_no_img.png') +'" ondragstart="return false;" onerror="this.setAttribute(\'src\',\'/images/news-demo/imgerror.png\');onerror = null;"/></div>',
                            '<div class="img-box wqd-h"><img src="' + (!!news.coverPicture.split(',')[1] ? (/(http)|(https)/gi.test(news.coverPicture.split(',')[1])?(news.coverPicture.split(',')[1]):(CSSURLPATH + news.coverPicture.split(',')[1])) : '/images/news-demo/wqd_no_img.png') +'" ondragstart="return false;" onerror="this.setAttribute(\'src\',\'/images/news-demo/imgerror.png\');onerror = null;"/></div>',
                            '<div class="img-box wqd-h"><img src="' + (!!news.coverPicture.split(',')[2] ? (/(http)|(https)/gi.test(news.coverPicture.split(',')[2])?(news.coverPicture.split(',')[2]):(CSSURLPATH + news.coverPicture.split(',')[2])) : '/images/news-demo/wqd_no_img.png') +'" ondragstart="return false;" onerror="this.setAttribute(\'src\',\'/images/news-demo/imgerror.png\');onerror = null;"/></div>',
                        '</div>',
                        '<div class="footer">',
                            '<div class="fl">',
                                '<span class="show-time wqd-clr wqd-bgclr wqd-fw wqd-fst">'+news.issueDate.split(' ')[0]+'</span>',
                                getTags(data.tags),
                            '</div>',
                            '<div class="fr">',
                                '<span class="fav wqd-clr wqd-bgclr wqd-fw wqd-fst"> <i class="icon-fav">',
                                    '<svg viewBox="0 0 48 48" >',
                                        '<path class="st0 wqd-bgclr" d="M36.4,19.2C36,19,35.5,19,34.9,19H31c0.5-2.3,0.6-5.6,0.6-7.6c0-2.3-1.9-4.2-4.2-4.2c-2.3,0-4.2,1.9-4.2,4.2    v0.8c0,4.6-3.7,8.3-8.2,8.4c-0.1,0-0.1,0-0.2,0h-4.2c-1.9,0-3.4,1.5-3.4,3.4v13.4c0,1.9,1.5,3.4,3.4,3.4h4.2    c0.4,0,0.8-0.4,0.8-0.9V22.2c5.2-0.4,9.3-4.7,9.3-10v-0.8c0-1.3,1.1-2.5,2.5-2.5c1.3,0,2.5,1.1,2.5,2.5c0,3.8-0.3,6.8-0.8,8.1    c-0.1,0.2,0,0.5,0.1,0.8c0.1,0.2,0.4,0.4,0.7,0.4h5c0.4,0,0.8,0,1.1,0.1c2.3,0.6,3.6,2.9,3,5.1c-0.7,2.5-4.1,11.2-4.4,12    c-0.5,0.8-1.2,1.2-2.2,1.2H19.8c-0.4,0-0.8,0.3-0.8,0.8c0,0.4,0.3,0.8,0.8,0.8h12.6c0,0,0.1,0,0.2,0c1.4,0,2.7-0.8,3.5-2.1    c0,0,0,0,0-0.1c0.1-0.4,3.8-9.6,4.5-12.2C41.4,23.3,39.6,20,36.4,19.2z M13.9,39h-3.4c-0.9,0-1.7-0.8-1.7-1.7V23.9    c0-0.9,0.8-1.7,1.7-1.7h3.4V39z"></path>',                                    '</svg>',
                                '</i>'+ (news.initialPraiseAmount+news.praiseAmount) +'</span>',
                                '<span class="view wqd-clr wqd-bgclr wqd-fw wqd-fst"> <i class="icon-view">',
                                    '<svg viewBox="0 0 48 48"><path class="wqd-bgclr" d="M23.4,15.9c-4.2,0-7.7,3.6-7.7,8s3.5,8,7.7,8c1.2,0,2.3-0.3,3.3-0.8c0.5-0.2,0.7-0.9,0.5-1.4c-0.2-0.5-0.8-0.7-1.3-0.5    c-0.8,0.4-1.6,0.6-2.5,0.6c-3.1,0-5.7-2.7-5.7-5.9s2.6-5.9,5.7-5.9c3.1,0,5.7,2.7,5.7,5.9c0,0.6-0.1,1.1-0.2,1.6    c-0.1,0.6,0.1,1.1,0.7,1.3c0.5,0.2,1.1-0.2,1.2-0.7c0.2-0.7,0.3-1.5,0.3-2.2C31.1,19.5,27.7,15.9,23.4,15.9z M19.8,22.4    c-0.2,0.5-0.3,1-0.3,1.5c0,0.3,0.2,0.5,0.5,0.5c0.3,0,0.5-0.2,0.5-0.5c0-0.4,0.1-0.7,0.2-1.1c0.4-1.2,1.5-1.9,2.7-1.9    c0.3,0,0.5-0.2,0.5-0.5c0-0.3-0.2-0.5-0.5-0.5C21.8,19.8,20.4,20.9,19.8,22.4z M46.2,22.6C40.5,15.2,32.1,9.7,23.4,9.7    c-8.7,0-15.9,5.4-21.6,12.8c-0.1,0.2-0.2,0.4-0.2,0.6v1.3c0,0.2,0.1,0.5,0.2,0.6C7.5,32.6,14.7,38,23.4,38c8.7,0,17-5.4,22.8-12.9    c0.1-0.2,0.2-0.4,0.2-0.6v-1.3C46.4,23,46.4,22.8,46.2,22.6z M44.4,24.2c-5.4,6.8-13,11.8-21,11.8s-14.5-5-19.8-11.8v-0.6    C9,16.8,15.4,11.8,23.4,11.8c8,0,15.6,5,21,11.8C44.4,23.6,44.4,24.2,44.4,24.2z"></path>   </svg>',
                                '</i>'+ (news.initialPageView+news.pageView) +'</span>',
                            '</div>',
                        '</div>',
                        '<hr class="line wqd-brc wqd-brw">',
                    '</div>',
                '</a>'
                ].join('');
            },
            articleNewsList3Fun: function () {
                var data = arguments[0], flagStr = arguments[1], index = arguments[2];
                var pageId = arguments[3];
                var news = data.news;

                /**
                 * 获取标签字符串
                 * @param {[Array]} arr 传入标签数据数组
                 */
                function getTags (arr) {
                    var i = 0, str = '';
                    for (; i<arr.length; i++) {
                        str += '<span data-tagid="'+arr[i].id+'" class="tag wqd-clr wqd-bgclr wqd-fw wqd-fst wqd-ff">'+arr[i].name+'</span>';
                    }
                    return str;
                }

                return [
                '<a href="page_'+pageId + '_' +news.id+'.html">',
                    '<div class="list-cell">',
                        '<div class="left-con wqd-w wqd-h"> <img src="' + (!!news.coverPicture.split(',')[0] ? (/(http)|(https)/gi.test(news.coverPicture.split(',')[0])?(news.coverPicture.split(',')[0]):(CSSURLPATH + news.coverPicture.split(',')[0])) : '/images/news-demo/wqd_no_img.png') +'" ondragstart="return false; "> </div>',
                        '<div class="right-con">',
                            '<p class="title wqd-clr wqd-ff wqd-fs wqd-fw wqd-fst">',
                                (news.isRecommend == "YES" ? '<em class="recommend">推荐</em>' : ''),
                                news.title,
                            '</p>',
                            '<p class="content wqd-clr wqd-ff wqd-fs wqd-fw wqd-fst">'+ news.digest +'</p>',
                            '<div class="infoBar">',
                                '<div class="tags">'+getTags(data.tags)+'</div>',
                                '<div class="time wqd-clr wqd-bgclr wqd-fw wqd-fst">'+news.issueDate.split(' ')[0]+'</div>',
                                '<div class="info"> <span class="view wqd-clr wqd-bgclr wqd-fw wqd-fst">阅读:'+ (news.initialPageView+news.pageView) +'</span> <span class="fav wqd-clr wqd-bgclr wqd-fw wqd-fst">点赞:'+ (news.initialPraiseAmount+news.praiseAmount) +'</span> </div>',
                            '</div>',
                        '</div>',
                        '<hr class="line wqd-brc wqd-brw">',
                    '</div>',
                '</a>'
                ].join('');
            },
            articleNewsList4Fun: function () {
                var data = arguments[0], flagStr = arguments[1], index = arguments[2];
                var pageId = arguments[3];
                var news = data.news;

                /**
                 * 获取标签字符串
                 * @param {[Array]} arr 传入标签数据数组
                 */
                function getTags (arr) {
                    var i = 0, str = '';
                    for (; i<arr.length; i++) {
                        str += '<span data-tagid="'+arr[i].id+'" class="tag wqd-clr wqd-bgclr wqd-fw wqd-fst wqd-ff">'+arr[i].name+'</span>';
                    }
                    return str;
                }

                return [
                '<a href="page_'+pageId + '_' +news.id+'.html">',
                    '<div class="list-cell">',
                        '<div class="left-con wqd-w wqd-h"> <img src="' + (!!news.coverPicture.split(',')[0] ? (/(http)|(https)/gi.test(news.coverPicture.split(',')[0])?(news.coverPicture.split(',')[0]):(CSSURLPATH + news.coverPicture.split(',')[0])) : '/images/news-demo/wqd_no_img.png') +'" ondragstart="return false; "> </div>',
                        '<div class="right-con">',
                            '<p class="title wqd-clr wqd-ff wqd-fs wqd-fw wqd-fst">',
                                (news.isRecommend == "YES" ? '<em class="recommend">推荐</em>' : ''),
                                news.title,
                            '</p>',
                            '<p class="content wqd-clr wqd-ff wqd-fs wqd-fw wqd-fst">'+ news.digest +'</p>',
                            '<div class="infoBar">',
                                '<div class="tags">'+getTags(data.tags)+'</div>',
                                '<div class="time wqd-clr wqd-bgclr wqd-fw wqd-fst">'+news.issueDate.split(' ')[0]+'</div>',
                                '<div class="info"> <span class="view wqd-clr wqd-bgclr wqd-fw wqd-fst">阅读:'+ (news.initialPageView+news.pageView) +'</span> <span class="fav wqd-clr wqd-bgclr wqd-fw wqd-fst">点赞:'+ (news.initialPraiseAmount+news.praiseAmount) +'</span> </div>',
                            '</div>',
                        '</div>',
                        '<hr class="line wqd-brc wqd-brw">',
                    '</div>',
                '</a>'
                ].join('');
            }
        },
        /* 对应 具体的内类名 后期也不能随便改 */
        arrArtContStr: [
            ".wqdArtPluginLx_1",
            ".wqdArtPluginLx_2",
            ".wqdArtPluginLx_3",
            ".wqdArtPluginLx_4"
        ].join(','),
        /* 存放对应的全部条数，当前页面 */
        pageData: {
            totalCount: 25,
            curPage: 3
        },
        /**
         * 获取对应 列表模板的名称
         * @param {[Object]} $obj 传入当前容器对象
         * return - str {[string]} 返回对应模板名称字符串
         */
        getListName: function ($obj) {
            if($obj.hasClass('articleNewsList1')) {
                return 'articleNewsList1';
            } else if($obj.hasClass('articleNewsList2')) {
                return 'articleNewsList2';
            } else if($obj.hasClass('articleNewsList3')) {
                return 'articleNewsList3';
            } else if($obj.hasClass('articleNewsList4')) {
            return 'articleNewsList4';
        }
        },
        /* 不计算导航样式 */
        notCount: function ($obj) {
            if($obj.hasClass('articleNewsList4')) {
                return true;
            }
            return false;
        },
        /* 初始化 */
        init: function () {
            var self = this;
            /* 新闻控件数据加载 */
            $.each($('.wqdelementEdit[data-elementtype="newArtList"]'), function (i, _) {
                // 判定是否为默认模板
                if($(_).attr('artnavtype')) {
                //     self.loadEvent($(_));
                // } else {
                    self.loadNavAndNews($(_));
                }
            });
        },
        /* 重置通栏高度 -- common */
        resizeHeight: function ($obj) {
            var self = this;
            // 重置当前对象样式
            $obj.find('img').each(function (i, _) {
                var img = new Image();
                img.src = $(_).attr('src');
                if(img.complete) {
                    if(img.width/img.height > ($(_).parent().width()/$(_).parent().height())) {
                        $(_).css({ "width": "auto", "height": "100%" });
                    } else {
                        $(_).css({ "width": "100%", "height": "auto" });
                    }
                } else {
                    (function (img, _) {
                        img.onload = function () {
                            if(this.width/this.height > ($(_).parent().width()/$(_).parent().height())) {
                                $(_).css({ "width": "auto", "height": "100%" });
                            } else {
                                $(_).css({ "width": "100%", "height": "auto" });
                            }  
                        }
                    })(img, _);
                }
            });
            if($obj.closest('.wqdSectiondiv').data('coltype') != 'newColList') {
                $obj.css({ 'height': $obj.find(self.arrArtContStr).outerHeight()+'px' });
            }
        },
        /* 是否可以设置通栏高度  */
        isSetHeight: function ($obj) {
            return $obj.closest('.wqdSectiondiv').data('coltype') != 'newColList'
        },
        /**
         * 绑定事件
         * @augments $obj 传入当前操作对象
         */
        loadEvent: function ($obj) {
            var _self = this;
            /* 为导航栏添加移入移出事件 */
            var $nav = $obj.find('.nav'),
                H = $obj.height(),
                NavMoreH = $nav.find('.nav-more').outerHeight(),
                contNavH = $nav.find('.cont-nav').outerHeight(),
                flag = false;                   // 保证只有在更多按钮上触发
            $nav.find('.cont-nav .show-more').on('mouseenter.more-nav_1', function () {
                $nav.find('.nav-more').show();
                // 防止更多分类的盒子高度高出盒子的大小， 当盒子出现时改变父容器的高度
                if(NavMoreH + contNavH + 20 > H) {
                    resetObjH($obj, NavMoreH + contNavH + 20 -H);
                    flag = true;
                }
            });
            $nav.on('mouseleave.more-nav_3', function () {
                $nav.find('.nav-more').hide();
                if(NavMoreH + contNavH + 20 > H && flag) {
                    resetObjH($obj, -(NavMoreH + contNavH + 20 -H));
                    flag = false;						
                }
            });
            $nav.find('.nav-more').length && $nav.find('.nav-more').on('mouseleave.more-nav_4', function () {
                $nav.find('.nav-more').hide();	
                if(NavMoreH + contNavH + 20 > H && flag) {
                    resetObjH($obj, -(NavMoreH + contNavH + 20 -H));	
                    flag = false;					
                }	
            });
            /**
             * 防止更多分类的盒子高度高出盒子的大小， 当盒子出现时改变父容器的高度
             * @param {[Object]}  当前父容器对象
             * @param {*} H  传入需要设置的高度
             */
            function resetObjH($obj, H) {
                $obj.css({
                    'height': $obj.height() + H + "px"
                });
            }
            /**
             *  导航栏点击事件
             */
            $nav.off('click.nav').on('click.nav', 'span', function () {
                var that = $(this);
                // 点击事件一样会触发mouseoleave 事件 所以要重置flag
                flag = false;
                // 清除所有span标签上的on
                $nav.find('span').removeClass('on');
                // 根据点击对应的容器内的span元素  执行对应的操作
                if(that.parents('.nav-more').length) {
                    // 加载数据
                    _self.renderNewsList($obj, {
                        id : that.data('categoryid'),
                        pageSize : (-(-$obj.attr('col'))||1) * (-(-$obj.attr('row'))||1),
                        sortType: $obj.attr('sorttype'),
                        type: $obj.attr('artnavtype'),
                    }); 
                    // 如果点击的是更多弹出框内的分类，则执行与 始终显示的导航列表的最后一个有效元素 互换（即‘更多’的上一个分类）
                    var arr = $nav.find('.cont-nav span'),
                        rpVal = $(arr[arr.length-2]).text(),
                        rpId = $(arr[arr.length-2]).data('id'),
                        oVal = that.text(),
                        oId = that.data('id');
                    that.text(rpVal);
                    that.data('id', rpId);
                    $(arr[arr.length-2]).text(oVal).addClass('on');
                    $(arr[arr.length-2]).data('id', oId);
                    // 重置导航条样式
                    // (function reRow() {
                    //     var oW = 0,maxWidth = $nav.width();
                    //     var arr = $nav.find('.cont-nav span')
                    //     $.each(arr, function (i, val) {
                    //         oW += $(val).width();
                    //     });
                    //     $nav.find('.cont-nav span').css('padding','0');
                    //     $nav.find('.cont-nav span').css('padding','0 ' + (maxWidth-4*arr.length-oW)/arr.length/2/maxWidth*100 + '%')
                    // })();
                    that.parents('.nav-more').hide();
                } else if(that.text()== '更多'){
                    return false;
                } else {
                    that.addClass('on');
                    // 为默认模板时 点击导航时加载导航
                    if($.isEmptyObject(that.data())) {
                        _self.loadNavAndNews($obj);
                        return;
                    }
                    // 加载数据
                    _self.renderNewsList($obj, {
                        id : that.data('categoryid'),
                        pageSize : (-(-$obj.attr('col'))||1) * (-(-$obj.attr('row'))||1),
                        sortType: $obj.attr('sorttype'),
                        type: $obj.attr('artnavtype'),
                    }); 
                }  
                // 每次点击导航时，重置数据之后应当重置加载更多按钮的样式 和flag
                if($obj.attr('artload') != 'load2') {
                    loadMoreFlag = 1;
                    $obj.find('.load-more p').text('加载更多')
                    $obj.find('.load-more p').removeAttr('style');
                }
            });
            /* 加载更多 */
            $obj.off('click.load-more').on('click.load-more', '.load-more p', function (e) {
                var id = $obj.find('.nav span.on').data('categoryid');
                var curPage = 0;
                if(id) {
                    if($obj.attr('artload') == 'load2') {
                        var that = $(e.target);
                        if(that.hasClass('item')) {
                            curPage = that.text();
                        } else if(that.hasClass('first')) {
                            curPage = 1;
                        } else if(that.hasClass('prev')) {
                            curPage = _self.pageData.curPage - 1;
                            if(curPage <= 0) return ;
                        } else if(that.hasClass('next')) {
                            curPage = _self.pageData.curPage + 1;
                            if(curPage > Math.ceil(_self.pageData.totalCount / ((-(-$obj.attr('col'))||1) * (-(-$obj.attr('row'))||1)))) return ;
                        } else {
                            return ;
                        }
                    } else {
                        curPage = ++loadMoreFlag;
                    }
                    _self.renderNewsList($obj,{
                        id: id,
                        pageSize : (-(-$obj.attr('col'))||1) * (-(-$obj.attr('row'))||1),
                        pageNo: curPage,
                        sortType: $obj.attr('sorttype'),
                        type: $obj.attr('artnavtype')
                    });
                } 
            });
        },
        /**
         * 初始化加载    加载导航栏信息以及新闻列表
         * @param {[Object]} $obj 传入当前容器对象
         */
        loadNavAndNews: function ($obj) {
            var self = this;
            // 假如没有传入strings   即没有选择任何栏目和分类  则显示默认字符串
            var strings = $obj.attr('navids');
            if(!strings) { return; }

            var navHtml = '';
            /* 获取用户分类数据 并存放到对应的分类中 */
            $.ajax({
                url:SAAS_NEWS+"/api/news/navigationbars/"+$obj.attr('userid')+"/"+($obj.attr('artnavtype') || "CATEGORY")+"?callback=?",
                dataType:'jsonp',
                jsonp:'callback',
                type:'GET',
                success: function (data) {
                    if(data && data.length) {
                        // 获取所有的分类id数组
                        var arrId = [];
                        $.each(data, function (_, val) {
                            arrId.push(val.id);
                        })
                        $.each(strings.split(','), function (i, _) {
                            var _index = $.inArray(-(-_), arrId);
                            if(_index != -1) {
                                navHtml += '<span class="wqd-clr wqd-fw wqd-fst wqd-bgclr wqd-ff wqd-fs wqd-brc ' + (i == 0 ? 'on':'') + '" data-categoryid="'+data[_index].id+'">'+data[_index].name+'</span>';
                            }                              
                        })
                    } else {
                        return;
                    }
                
                    self.notCount($obj)? self.renderNav1($obj, navHtml):self.renderNav($obj, navHtml);
                    /* 重新计算高度 */
                    self.resizeHeight($obj);
                    // 绑定事件
                    self.loadEvent($obj);
                    // 加载 对应列表数据
                    self.renderNewsList($obj, {
                        id : $obj.find('.nav span.on').data('categoryid'),
                        pageNo: 1,
                        pageSize: (-(-$obj.attr('col'))|| 1) * (-(-$obj.attr('row'))|| 1),
                        sortType: $obj.attr('sorttype'),
                        type: $obj.attr('artnavtype')
                   });
                }
            });
        },
        /**
         * 调接口获取数据，渲染到列表中
         * @param {[Object]} $obj 传入当前容器对象
         * @param {[Object]} data 传入所属要的数据对象
         * @param {[string]} data.categoryId 传入分类ID
         * @param {[string]} data.pageNo 传入页数
         * @param {[string]} data.pageSize 传入需要返回每一页的数据量
         * @param {[string]} data.userId 传入用户ID
         * @param {[string]} data.sortType 传入数据返回值排序类型
         */
        renderNewsList: function ($obj, data) {
            var self = this;
            // 获取数据对象，并未对象赋值或赋予默认值
            var json =  {};
            json.sourceId = data.id || 0;
            json.type = data.type || "CATEGORY",
            json.pageNo = data.pageNo || 1;
            json.pageSize = data.pageSize || 1;
            json.sortType = data.sortType || 'ISSUE_DATE_DESC';
            // 调用接口  获取数据
            var newsListHtml = '';
            $.ajax({
                url: SAAS_NEWS+'/api/news/page',
                type:'GET',
                dataType: 'jsonp',
                jsonp: 'callback',
                data: json,
                success: function (data) {
                    /* 存储页数 */
                    self.pageData.totalCount = parseInt(data.totalCount);
                    self.pageData.curPage = parseInt(data.pageNo || 1);

                    if(json.pageNo > data.totalPages) {
                        var $loadMore = $obj.find('.newsList .load-more');
                        if($loadMore.length && $obj.attr('artload') == 'load1') {
                            $loadMore.find('p').text('没有更多了')
                            $loadMore.find('p').css({
                                'background':'#eee',
                                'color':'#000'
                            });
                        }
                        return;
                    }
                    // 点击加载更多时，先获取当前对象初始属性值
                    // if(json.pageNo > 1) {
                       // var oData = self.getOriginStyle($obj);
                    // }
                    var sJSON = self.getLastTopElem($obj);
                    // 加载更多按钮对象
                    var $loadMore = $obj.find('.newsList .load-more');
                    if(data.data && data.data.length) {
                        $.each(data.data, function (i, val) {
                            newsListHtml += self.getListHtml(val, self.getListName($obj), i, $obj.attr('data-pageid'));
                        });
                        $loadMore.length && $loadMore.attr("style", '');
                    } else {
                        newsListHtml = self.getListHtml({}, self.getListName($obj));
                        // 无数据的时候隐藏加载更多
                        $loadMore.length && $loadMore.hide();
                    }
                    // 获取存放列表的容器 newsList   以及 单元列表 list-cell;
                    var $newList = $obj.find('.newsList');
                    var $newsListCell =  $newList.find('.list-cell');
                    // 判定是否为有加载更多按钮 的模板
                    if($loadMore.length) {
                        // 判断是否在执行加载更多 的事件， 并且在加载完成后使得 加载按钮更换颜色
                        if(json.pageNo > 1 && $obj.attr('artload') != 'load2') {
                            $loadMore.before(newsListHtml);
                        } else {
                            $newsListCell.length && $newsListCell.remove()
                            $loadMore.before(newsListHtml);
                        }
                        // 如果数据加载完成之后 判定是否仍有更多的数据   以此来修改加载更多 按钮的样式
                        if($obj.attr('artload') != 'load2') {
                            if(data.totalPages == loadMoreFlag) {
                                $loadMore.find('p').text('没有更多了')
                                $loadMore.find('p').css({
                                    'background':'#eee',
                                    'color':'#000'
                                });
                            } else {
                                $loadMore.find('p').text('加载更多')
                                $loadMore.find('p').removeAttr('style');
                            }
                        }
                    } else {
                        $obj.find('.newsList').html(newsListHtml);
                    }
                    // 根据列数动态调整样式
                    if(data.data && data.data.length) {
                        $obj.find('.newsList .list-cell').css({
                            'width': (100/($obj.attr('col') || 1)).toFixed(1) + '%',
                            'display': 'inline-block',
                            'padding-right': '10px'
                        });
                    }
                    // 数据加载完成之后 改变当前页面的样式
                /*********************** 后期要改 改改改改改改 */
                    // function imgLoad(img, callback) {
                    //     var timer = setInterval(function() {
                    //         if (img.complete) {
                    //             clearInterval(timer);
                    //             callback();
                    //         }
                    //     }, 50);
                    // }
                    // if($obj.find('img').length){
                    //     $.each($obj.find('img'), function (i, _) {
                    //         imgLoad(_, function() {
                    //             self.resizeHeight($obj);
                    //             if(i == $obj.find('img').length - 1) {
                    //                 self.setStyle($obj, oData);
                    //             } 
                    //         });
                    //     })
                    // } else {
                    //     self.resizeHeight($obj);
                    // }
                    self.resizeHeight($obj);
                    // self.setStyle($obj, oData);
                    self.isSetHeight($obj) && self.setSectionHeight($obj, sJSON);
                    /* 重新显示分页 */
                    if($obj.attr('artload') == 'load2') {
                        self.renderPagination($obj);
                    }
                }
            });
        },
        /**
         * 获取新闻列表
         * @param {[data]} data 传入新闻数据对象
         * @param {[Object]} flagStr 是否具有图片 或 加载更多的对象集合
         * @param {[Number]} index 传入当前遍历的索引值 
         * @param {[Number]} pageId 传入当前详情页id 
         */
        getListHtml: function (data, flagStr, index, pageId) {
            var self = this;
            /* 加入没有数据（传入的data为空），则返回默认模板结构 和无数据文本 */
            if($.isEmptyObject(data)) { return self.listNullStr[flagStr]; }
            return self.listFun[flagStr+'Fun'].call(self, data, flagStr, index, pageId);
        },
        /* 设置section高度值 */
        setSectionHeight: function ($obj, sJSON) {
            var self = this;
            var $parent = $obj.parent('section');
            var eJSON = self.getLastTopElem($obj);
            // 设置列表title宽度
            if($obj.find('.wqdArtPluginLx_1').length) $obj.find('.newsTitle').css('width', 75.5 - 5*$obj.attr('col') + '%');
            self.isSetHeight($parent) && $parent.css({
                'height': eJSON.lastTop + (eJSON.$lastElem && eJSON.$lastElem.outerHeight()) + 'px'
            }); 
        },
        /* 得到最高元素 */
        getLastTopElem: function ($obj) {
            var json = {};
            var $parent = $obj.parent('section');
            var $arr = $parent.children('.wqdelementEdit');
            json.top = $obj.position().top;
            json.H = $obj.outerHeight();

            json.lastTop = json.top;
            json.$lastElem = $obj;
            json.offsetH = $parent.outerHeight() - json.lastTop - (json.$lastElem && json.$lastElem.outerHeight());
            $arr.each(function (i, _) {
                var tempTop = $(_).position().top;
                if(json.lastTop+json.$lastElem.outerHeight() < tempTop+$(_).outerHeight()) {
                    json.lastTop = tempTop;
                    json.$lastElem = $(_);
                }
            });
            json.offsetH = $parent.outerHeight() - json.lastTop - (json.$lastElem && json.$lastElem.outerHeight());
            return json;
        },
        /**
         * 设置样式
         * @param {[Object]} $obj 传入当前操作对象
         * @param {[Object]} data 传入起始数据
         */
        // setStyle: function ($obj, data) {
        //     var self = this;
        //     // 设置列表title宽度
        //     if($obj.find('.wqdArtPluginLx_1').length) $obj.find('.newsTitle').css('width', 75.5 - 5*$obj.attr('col') + '%');
        //     // 获取当前对象父盒子对象
        //     var _curParObj = $obj.parent();
        //     var _curParObjH = _curParObj.height();
        //     获取当前对象的高度值
        //     var H = $obj.height();
        //     if(data.siblingsData.length) {
        //         $.each(data.siblingsData, function (i, _) {
        //             var _curObj = _curParObj.children().eq(_.index);
        //             // 设置会有可能遮盖的元素高度
        //             // _curObj.css({
        //             //     'top': H - data.H + _.disY + 'px'
        //             // });
                    
        //             // // 重新设置当前通栏的高度
        //             // if(_curObj.offset().top + _curObj.height() > data._curParObjH) {
        //             //     _curParObj.css({
        //             //         'height': data._curParObjH + H - data.H + 'px'
        //             //     });
        //             // }
        //             // self.isSetHeight(_curParObj) && _curParObj.css({
        //             //     'height': _curParObjH + H - data.H + 'px'
        //             // });
        //         })
        //     } else {
        //         self.isSetHeight(_curParObj) && _curParObj.css({
        //             'height': _curParObjH + H - data.H + 'px'
        //         });
        //     }
        // },
        /**
         * 获取初始样式
         * @param {[Object]} $obj 传入当前操作对象
         * @returns {[Object]} oData 返回所有当前通栏下 有可能会覆盖元素的集合 以及其 索引值 和 相对通栏的top值对象
         */
        // getOriginStyle: function ($obj) {
        //     var oData = {};
        //     // 获取通栏对象
        //     var $wrap = $obj.parents('.wqdSectiondiv');
        //     var disH = $wrap.offset().top;
        //     // 获取当前对象父盒子对象
        //     var _curParObj = $obj.parent();
        //     // 获取兄弟节点数组
        //     var $siblingsObjArr = $obj.siblings();
        //     // 获取当前对象 宽度 和 高度 以及 offset值 (相对于通栏)
        //     oData.top = $obj.offset().top;
        //     oData.left = $obj.offset().left;
        //     oData.H = $obj.height();
        //     oData.W = $obj.width();
        //     oData.siblingsData = [];
        //     // 获取配置
        //     $.each($siblingsObjArr, function (i, _) {
        //         // 只获取当前元素以下的元素
        //         if($(_).offset().top >= oData.top) {
        //             // 判定当前对象高度向下扩展时是否会影响到这些对象
        //             if(oData.left < $(_).offset().left + $(_).width() && $(_).offset().left < oData.left) {     // 左侧
        //                 oData.siblingsData.push({
        //                     index: $.inArray(_, _curParObj.children()), // 获取当前元素索引位置
        //                     disY: $(_).offset().top - disH, // 相对于当前通栏的top值
        //                 });
        //             }
        //             if(oData.left + oData.W > $(_).offset().left && $(_).offset().left > oData.left) {          // 右侧
        //                 oData.siblingsData.push({
        //                     index: $.inArray(_, _curParObj.children()), // 获取当前元素索引位置
        //                     disY: $(_).offset().top - disH, // 相对于当前通栏的top值
        //                 });
        //             }
        //         }
        //     });
        //     return oData;
        // },
        /* 重新计算 导航条 */
        renderNav: function ($obj, navHtml) {
            /* 判断，如果navHtml 为空，则按照现有的导航数据加载导航条，如果不为空，按照接口加载导航条 */
            if(!!navHtml) {
                /* 如已存在 先清空  插入分类和更多分类的容器 */
                $obj.find('.nav').empty().append('<hr class="line"><div class="cont-nav"></div><div class="nav-more"></div>');
                /* 内容-导航 */
                var $nav = $obj.find('.nav .cont-nav');
                /* 更多-导航 */
                var $moreNav = $obj.find('.nav .nav-more');
                /* 添加分类导航内容和更多 */
                $nav.append(navHtml + '<span class="show-more wqd-clr wqd-fw wqd-fst wqd-bgclr wqd-ff wqd-fs wqd-brc">更多</span>');
            } else {
                /* 内容-导航 */
                var $nav = $obj.find('.nav .cont-nav');
                /* 更多-导航 */
                var $moreNav = $obj.find('.nav .nav-more');
                /* 添加分类导航内容和更多 */
                $nav.find('.show-more').length && $nav.find('.show-more').remove();
                $nav.append($moreNav.html()+ '<span class="show-more wqd-clr wqd-fw wqd-fst wqd-bgclr wqd-ff wqd-fs wqd-brc">更多</span>');
                $moreNav.html('');
            }

            /* 分类导航值 */
            var $spanArr = $nav.find('span').removeAttr('style', ''), length = $spanArr.length;
            /* 导航宽度 */    
            var maxWidth = $obj.find('.nav').outerWidth()-5;
            /* 元素宽度 按照比例的25px/725px */
            var sum1 = $spanArr.eq(length-1).width(), temp1 = 4 + (50/725*maxWidth); 
            /* 元素的padding + margin值 */
            var sum2 = temp1;
            /* padding 25/725  margin:2px */
            var i = 0, flag = true;
            $.each($spanArr, function (_, val) {
                if(_ == length - 1) return false;
                /* 需要填充到第一行的有哪些 */
                if(flag) {
                    var temp = sum1 + sum2 + $(val).width() + temp1;
                    if(temp > maxWidth) {
                        flag = false;
                        $moreNav.append($(val)[0].outerHTML);
                        $(val).remove();
                        return true;
                    }
                    if(temp == maxWidth) flag = false;
                    sum1 += $(val).width();
                    sum2 += temp1;
                    i ++;
                } else {
                    if(!$(val).hasClass('show-more')) {
                        $moreNav.append($(val)[0].outerHTML);
                        $(val).remove();
                    }
                }
            });
            /* 分类不够多，不需要有更多俩字 */
            if(i >= length - 1) {
                var $move = $obj.find('.nav .show-more');
                sum1 -= $move.width();
                $move.remove();
            }
            var lastLength = $nav.find('span').length;
            if(i >= length - 1) {
                $spanArr.css({
                    "padding": '0 '+25/725*maxWidth+'px',
                    "margin": '0 2px'
                    // "margin": '0 '+parseInt((maxWidth - sum1 - lastLength*(50/725*maxWidth))/(lastLength*2))+'px'
                });
            } else {
                $spanArr.css({
                    "padding": '0 '+parseInt((maxWidth - sum1 - lastLength*4)/(lastLength*2))+'px',
                    "margin": '0 2px'
                });
                $moreNav.find('span').css({
                    "padding": '0 '+parseInt((maxWidth - sum1 - lastLength*4)/(lastLength*2))+'px',
                    "margin": '0 2px'
                });
            }
        },
        /* 重新计算 导航条1 */
        renderNav1: function ($obj, navHtml) {
            if(!!navHtml) {
                /* 如已存在 先清空  插入分类和更多分类的容器 */
                $obj.find('.nav').html(navHtml);
            } else {
               
            }
        },
        /* 重新计算 分页 */
        renderPagination: function ($obj) {
            var self = this;
            var page = Math.ceil(self.pageData.totalCount / ((-(-$obj.attr('col'))||1) * (-(-$obj.attr('row'))||1)));
            var str = '';
            /* 大于7才会有...方式 */
            if(page >= 7) {
                /* 点击最后一个或...之前的一个 */
                if(self.pageData.curPage+2 >= page) {
                    for(var i=0;i<5; i++) {
                        str = '<p class="item '+(page-i == self.pageData.curPage ? 'on':'')+'">'+(page-i)+'</p>' + str;
                    }
                } else {
                    var prevCount = nextCount = self.pageData.curPage; /* 显示5个 */
                    str += '<p class="item on">'+self.pageData.curPage+'</p>';
                    for(var i=0; i<2; i++) {
                        prevCount --;nextCount ++;
                        if(prevCount > 0) {
                            str = '<p class="item">'+prevCount+'</p>'+str+'<p class="item">'+nextCount+'</p>';
                        } else {
                            str += '<p class="item">'+nextCount+'</p>';
                            nextCount ++;
                            str += '<p class="item">'+nextCount+'</p>';
                        }
                    }
                    str += '<p class="more">...</p><p class="item">'+page+'</p>';
                }
            } else {
                for(var i=1; i<=page; i++) {
                    str += '<p class="item '+(i == self.pageData.curPage ? 'on':'')+'">'+i+'</p>';
                }
            }
            $obj.find('.load-more .pages').html(str);
            $obj.find('.load-more .pages p').addClass('wqd-fw wqd-fst wqd-ff wqd-bgclr wqd-clr');
        }
    };
    artListPluginLx.init();
})