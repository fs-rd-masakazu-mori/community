// ■タイマーループ
// onStart()
// └timer
// 　└update()
// 　　└update()
// 　　 └CRevolution.update()
// 　　 　└CRevolution.moveOnGravityEffect()
// 　　 　└CRevolution.view()
// 　　 　└CRevolution.updateData()
//
// ■イベント
// onStart()
// └setConsole()
// └readDataOnCahnged()
// │└CRevolution.readData()
// └set timer( update() )
// onStep()
// └setConsole()
// └readDataOnCahnged()
// └update()
// onStep()
// └setConsole()
// └clear timer

var REVOLUTION_TAG	= "#revolution";	// 公転対象を表すタグ
var OFFSET_X		= 275				// 重力源のX座標
var OFFSET_Y		= 275				// 重力源のY座標
var M				= 34.2;				// 重力限の質量

//var G				= 6.672;			// 地球の重力定数
var G				= 6.672 * 0.165;	// 月の重力定数
//var G				= 6.672 * 2.36;		// 木星の重力定数
//var G				= 6.672 * 27.9;		// 太陽の重力定数

// 公転対象プロトタイプ
var CRevolution = function( id )
{
	this.target	= $( REVOLUTION_TAG + id );
	this.id		= id;
	this.x		= 0;
	this.y		= 0;
	this.dx		= 0;
	this.dy		= 0;
	this.readData();
	this.view();
};
CRevolution.prototype = 
{
	// 公転対象の状態を更新
	update: function()
	{
		this.moveOnGravityEffect();
		this.view();
		this.updateData();
	}, 

	// データ部から位置と速度を読み込み、公転対象の位置と速度を更新
	readData: function()
	{
		var sel = REVOLUTION_TAG + this.id + "_data";
		this.x = Number( $( sel + " .px input" ).val() );
		this.y = Number( $( sel + " .py input" ).val() );

		this.dx = Number( $( sel + " .dx input" ).val() );
		this.dy = Number( $( sel + " .dy input" ).val() );
	}, 

	// 公転対象の位置から重力影響を計算し、速度を変更後、公転対象の位置を移動
	moveOnGravityEffect: function()
	{
		var r = Math.sqrt( Math.pow( this.x, 2 ) + Math.pow( this.y, 2 ) );
		this.dx = this.dx - G * M * this.x / Math.pow( r, 3 );
		this.dy = this.dy - G * M * this.y / Math.pow( r, 3 );

		this.x = this.x + this.dx;
		this.y = this.y + this.dy;
	}, 

	// 現在位置に公転対象を表示
	view: function()
	{
		this.target.css( "left",　this.x + OFFSET_X );
		this.target.css(  "top",　this.y + OFFSET_Y );
	}, 

	// データ部を更新
	updateData: function()
	{
		var sel = REVOLUTION_TAG + this.id + "_data";
		$( sel + " .px input" ).val( Number( this.x ).toFixed( 2 ) );
		$( sel + " .py input" ).val( Number( this.y ).toFixed( 2 ) );

		$( sel + " .dx input" ).val( Number( this.dx ).toFixed( 2 ) );
		$( sel + " .dy input" ).val( Number( this.dy ).toFixed( 2 ) );

		var va = Math.sqrt( Math.pow( this.dx, 2 ) + Math.pow( this.dy, 2 ) );
		$( sel + " .va" ).text( Number( va ).toFixed( 2 ) );

		var pa = Math.sqrt( Math.pow( this.x, 2 ) + Math.pow( this.y, 2 ) );
		$( sel + " .pv" ).text( Number( pa * va ).toFixed( 2 ) );
	}, 
};

// ハンドラ登録
$( main );

var Revolutions = Array( 1 );
var data_changed;
var timer;

function main()
{
	// 公転対象の生成
	for ( var i = 0; i < 1; i++ ) Revolutions[ i ] = new CRevolution( i );

	timer = 0;
	data_changed = false;

	// 操作コンソール用ハンドラ登録
	$( "#pause0" ).click( onPause );
	$( "#step0"  ).click( onStep );
	$( "#start0" ).click( onStart );

	// 値の手入力更新時ハンドラ登録
	$( "form" ).change( function(){ data_changed = true; } );
}

// 操作コンソール
function setConsole( pause , step , start )
{
	$( "#start0" ).toggle( start === false );
	$( "#start1" ).toggle( start === true  );

	$( "#step0"  ).toggle( step  === false );
	$( "#step1"  ).toggle( step  === true  );

	$( "#pause0" ).toggle( pause === false );
	$( "#pause1" ).toggle( pause === true  );
}

var TIME_STEP	= 1000 / 60;	// 60fpsで更新

function onStart()
{
	setConsole( false, false, true );
	readDataOnCahnged();
	timer = setInterval( update , TIME_STEP );
}

function onStep()
{
	setConsole( false, true, false );
	readDataOnCahnged();
	update();
	setTimeout( onPause , TIME_STEP );
}

function onPause()
{
	setConsole( true, false, false );
	if ( timer )
	{
		clearTimeout( timer );
		timer = 0;
	}
}

// データ変更時のみ各公転対象のデータを読み込む
function readDataOnCahnged()
{
	if ( data_changed === false ) return;
	for ( var i = 0; i < 1; i++ ) Revolutions[ i ].readData();
	data_changed = false;
}

// 各公転対象の状態を更新する（設定fps毎に呼び出される）
function update()
{
	for ( var i = 0; i < 1; i++ ) Revolutions[ i ].update();
}
