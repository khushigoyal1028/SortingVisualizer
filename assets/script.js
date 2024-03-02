const UNSORTED = 'deepskyblue';
const SORTED = 'mediumspringgreen';
const COMPARE = 'crimson';
const SELECTED = 'blueviolet';
const LEFT = 'gold';
const RIGHT = 'orangered';

var size=30;
var delay=100;

var arr = [];
var algo_selected;

function createArray() {
    arr = [];
    $("#array").html('');

    for(var i = 0; i < size; i++) {
        var n = Math.floor( Math.random()*300 );
        arr.push(n);
        
        var $element = $('<div>');
        $element.attr('id', "e" + i);
        $element.attr('class', "element");
        $element.css('background-color', UNSORTED);
        $element.css('width', '20px');
        $element.css('height', n.toString() + 'px');
        $element.css('margin', '1px');
        $element.appendTo("#array");
    }
}

function setHeight(id, height) {
    $("#e" + id).css('height', height);
}

function setColor(id, color) {
    $("#e" + id).css('background-color', color);
}

function setColorRange(p, r, color) {
    for(var i = p; i <= r; i++)
        $("#e" + i).css('background-color', color);
}

function swap(a, b) {
    var temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;

    var h1 = $("#e" + a).css('height');
    var h2 = $("#e" + b).css('height');

    setHeight(a, h2);
    setHeight(b, h1);
}

function disableOthers() {
    $("#sort").prop('disabled', true);
    $("#randomize").prop('disabled', true);
}

function enableOthers() {
    $("#sort").prop('disabled', false);
    $("#randomize").prop('disabled', false);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

$(document).ready(function() {
    createArray();

    $("#randomize").click(
        function() {
            createArray();
        }
    );

    $(".algo-btn").click(
        function() {
            algo_selected = $(this).html();

            $(".algo-btn-active").removeClass('algo-btn-active');
            $(this).addClass('algo-btn-active');

            $("#no-algo-warning").removeClass('display-flex');
            $("#no-algo-warning").addClass('display-none');
        }
    );

    $("#sort").click(
        async function() {
            disableOthers();
            setColorRange(0, size - 1, UNSORTED);

            if(algo_selected == "Bubble Sort")
                await bubbleSort();
            else if(algo_selected == "Selection Sort")
                await selectionSort();
            else if(algo_selected == "Insertion Sort")
                await insertionSort();
            else  if(algo_selected == "Merge Sort")
                await mergeSort(0, size - 1);
            else if(algo_selected == "Quicksort")
                await quicksort(0, size - 1);
            else if(algo_selected == "Heapsort")
                await heapsort();
            else {
                $("#no-algo-warning").removeClass('display-none');
                $("#no-algo-warning").addClass('display-flex');
            }

            enableOthers();
        }
    );
});