
// scripts .js

$(function () {

    // var data = JSON.parse(localStorage.getItem("todoData"));
    // data = data || [[],[],[],[],[],[],[],[]];

    $.post('/load',function (result) {
        var data = result || [[],[],[],[],[],[],[],[]];

        $.each( data, function (index, params) {
            $.each( params, function (indexItem, item) {
                $('#'+index).append('<li class="Bullet">' + item + '</li>');
            });
        });

    });

    $('#todoList ul').sortable({

        items: "li:not('.listTitle, .addItem')",
        connectWith:"ul",
        dropOnEmpty:true,
        placeholder:"emptySpace",

        stop:function(event,ui) {

            //var ul = ui.item.parent()[0];
            var ul = event.target;
            //var id = +(ul.id);
            //var data = JSON.parse(localStorage.getItem("todoData"));
            //data = data || [[],[],[],[],[],[],[],[]];
            $.post('/load',function (result) {
                var ul = this;
                var id = +(ul.id);
                var data = result || [[],[],[],[],[],[],[],[]];
                data[id] = [];

                $(ul.children).filter('.Bullet').each( function (item) {
                    data[id].push(this.innerText);
                });

                //localStorage.setItem("todoData", JSON.stringify(data));

                $.ajax({
                    url: '/save',
                    method: 'POST',
                    data: JSON.stringify(data),
                    contentType: 'application/json; charset=utf-8',
                    // success: function (result) {
                    //    console.log(result);
                    // }
                    // },data,function (result) {
                    //     console.log('load data');
                })

            }.bind(ul));
        },

        receive:function(event,ui) {
            if (ui.item.parent().length == 0) return;

            //var id = +(ui.item.parent()[0].id);
            //var data = JSON.parse(localStorage.getItem("todoData"));
            //data = data || [[],[],[],[],[],[],[],[]];
            $.post('/load',function (result) {
                var ui =this;
                var id = +(ui.item.parent()[0].id);
                var data = result || [[],[],[],[],[],[],[],[]];
                data[id].push(ui.item[0].innerText);

                var id = +(ui.sender[0].id);
                for (var i=0; i<data[id].length; i++) {
                    if (data[id][i]==ui.item[0].innerText) {break;}
                }

                data[id].splice([i],1);

                // localStorage.setItem("todoData", JSON.stringify(data));

                $.ajax({
                    url: '/save',
                    method: 'POST',
                    data: JSON.stringify(data),
                    contentType: 'application/json; charset=utf-8',
                })

            }.bind(ui));

        }
    });

    $('input').keydown(function(e) {

        if (e.keyCode == 13) {
            //var item = $(this).val();
            //var id = +($(this).parent().parent()[0].id);
            //var data = JSON.parse(localStorage.getItem("todoData"));
            //data = data || [[],[],[],[],[],[],[],[]];

            $.post('/load',function (result) {
                var item = $(this).val();
                var data = result || [[],[],[],[],[],[],[],[]];
                var id = +($(this).parent().parent()[0].id);
                data[id].push(item);
                //localStorage.setItem("todoData", JSON.stringify(data));

                $.ajax({
                    url: '/save',
                    method: 'POST',
                    data: JSON.stringify(data),
                    contentType: 'application/json; charset=utf-8',
                });

                $(this).parent().parent().append('<li class="Bullet">' + item + '</li>');
                $(this).val('');
            }.bind(this));

        }
    });

    $('#trash').droppable({

        drop:function(event,ui) {

            var id = +(ui.draggable.parent()[0].id);
            //var data = JSON.parse(localStorage.getItem("todoData"));
            //data = data || [[],[],[],[],[],[],[],[]];

            $.post('/load',function (result) {
                var ui =this;
                var id = +(ui.item.parent()[0].id);
                var data = result || [[],[],[],[],[],[],[],[]];

                for (var i=0; i<data[id].length; i++) {
                    if (data[id][i]==ui.draggable[0].innerText) {break;}
                }

                data[id].splice([i],1);

                //localStorage.setItem("todoData", JSON.stringify(data));

                $.ajax({
                    url: '/save',
                    method: 'POST',
                    data: JSON.stringify(data),
                    contentType: 'application/json; charset=utf-8',
                });

                ui.draggable.remove();
            }.bind(ui));

        }

    });

});