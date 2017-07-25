;
(function () {
    'use strict';

    var $form_add_task = $('.add-task'),
        new_task = {},
        task_list = {}

        init()
     $form_add_task.on('sbumit', function (e) {
        /* 禁用默认行为 */
        e.preventDefault();
        /* 获取新Task的值 */
        new_task.content = $(this).find('input[name=content]').val();
        /* 如果新Task的值为空 则直接返回 否则继续执行 */
        if (!new_task.content) return;
        console.log('new_task')
        /* 存入新Task */
        add_task(new_task)
    })

    function add_task(new_task) {
        /* 将新Task推入到task_list */
        task_list.push(new_task);
        /* 更新localStorate */
        store.set('task_list', task_list)

        console.log('task_list', task_list)
    }

    function init() {
        task_list = store.get('task_list') || [];
      //  console.log(22)
    }

    function s(){

    }
})()