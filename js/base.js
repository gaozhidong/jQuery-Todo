;
(function () {
    'use strict';
    var log = console.log.bind(console);
    var $form_add_task = $('.add-task')
    var task_list = {}
    var $delete_task



    init()
    $form_add_task.on('submit', function (e) {
        var new_task = {}
        /* 禁用默认行为 */
        e.preventDefault();
        /* 获取新Task的值 */
        var $input = $(this).find('input[name=content]')
        new_task.content = $input.val();

        /* 如果新Task的值为空 则直接返回 否则继续执行 */
        if (!new_task.content) return;
        /* 存入新Task */
        if (add_task(new_task)) {
            //render_task_list();
            $input.val(null)
        }

    })

    $delete_task.on('click', function () {
        log(1)
        var $this = $(this);
        var item = $this.parent().parent()
    })

    function add_task(new_task) {
        /* 将新Task推入到task_list */
        task_list.push(new_task)
        /* 更新localStorate */
        refresh_task_list()
        return true;
    }
    /* 刷新locaStroage数据并渲染tpl */
    function refresh_task_list() {
        store.set('task_list', task_list);
        render_task_list()
    }
    //删除task
    function delete_task(index) {
        /* 如果没有index 或者 index 不存在直接返回 */
        if (!index || !task_list[index]) return;

        delete task_list[index];
        /* 更新localStorate */
        refresh_task_list();

    }


    function init() {
        task_list = store.get('task_list') || [];
        if (task_list.length) {
            render_task_list();
        }
    }

    function render_task_list() {
        var $task_list = $('.tasks-list');
        $task_list.html('')
        for (var i = 0; i < task_list.length; i++) {
            var $task = render_task_item(task_list[i], i)
            $task_list.append($task)
        }

        $delete_task = $('.action.delete')
        log($delete_task)
    }

    function render_task_item(data, index) {
        var list_item_tpl = `
                <div class="task-item" data-index = "${index}">		
                    <span><input type="checkbox"></span>
                    <span class="task-content">${data.content}</span>
                    <span class="float-right">
                        <span class="action delete"> 删除</span>
                        <span class="action"> 详细</span>
                    </span>
                </div>
            `
        return $(list_item_tpl)
    }
})()