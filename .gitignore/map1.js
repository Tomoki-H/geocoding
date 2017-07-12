var geocoder;
var map;
function initialize() {
    //ジオコーダー（住所→経度緯度）を行うオブジェクトのインスタンス化
    geocoder = new google.maps.Geocoder();
    //中心座標の経度・緯度の指定
    var latlng = new google.maps.LatLng(39.8012332, 141.1376046);
    // optでは主に下記３つを指定
    var opts = {
        zoom: 15, //倍率
        center: latlng, //中心座標
        mapTypeId: google.maps.MapTypeId.HYBRID // ROADMAPとSATELLITEの複合した地図（HYBRID）
    };
    //地図オブジェクト作成 
    map = new google.maps.Map(document.getElementById("map_canvas"), opts);
}
function codeAddress() {
    //「address」のvalueを取得
    var address = document.getElementById("address").value;
    // geocodeリクエスト実行
    // 住所をaddressプロパティに入れる
    if (geocoder) {
        geocoder.geocode({'address': address, 'region': 'jp'},
                function (results, status) {
                    //コールバック関数で正常に値を取得している場合
                    if (status == google.maps.GeocoderStatus.OK) {
                        //取得した経度緯度の地図の中心をセット
                        map.setCenter(results[0].geometry.location);
                        //表示範囲の設定オブジェクト
                        var bounds = new google.maps.LatLngBounds();
                        //複数検索された場合に対応
                        for (var r in results) {
                            if (results[r].geometry) {
                                var latlng = results[r].geometry.location;
                                //検索結果がすべて表示されるように表示を設定
                                bounds.extend(latlng);
                                //マーカーの設置
                                new google.maps.Marker({
                                    position: latlng, map: map
                                });
                                //HTMLに緯度、経度を書き込み
                                document.getElementById('id_ido').innerHTML = latlng.lat();
                                document.getElementById('id_keido').innerHTML = latlng.lng();
                            }
                        }
                        //表示範囲を調整
                        map.fitBounds(bounds);
                    } else {
                        alert("Geocode 取得に失敗しました: " + status);
                    }
                });
    }
}
