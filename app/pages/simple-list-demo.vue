<template>
	<div class="container">
		<h1 class="page-title">学生列表<small><a href="#!/edit-demo">添加</a></small></h1>
		<table v-zptable="rows" url="/path/to/list" :lazy="false" :ctrl="ctrl" :qmodel="qmodel" class="table table-bordered table-hover">
			<thead>
				<tr class="active">
					<th width="10%">学号</th>
					<th width="30%">学生姓名</th>
					<th width="30%">年级</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(index, row) in rows">
					<td>{{row.no}}</td>
					<td>{{row.name}}</td>
					<td>{{row.grade}}</td>
					<td>
						<a href="#!/edit-demo">编辑</a>
						<a href="javascript:void(0)" @click="delete(row.i)">删除</a>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<requirements>
	_:			'zptable'
	core:		'core'
</requirements>

<script>
	return {
		mixins: [core.listPageMixin],
		route: {
			activate: function() {
				this.setBreadcrumb([
					{title:'首页', href: '#!/'},
					{title:'简单学生列表'},
				])
			},
		},
	}
</script>


