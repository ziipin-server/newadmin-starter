<template>
	<div class="panel panel-default">
		<div class="panel-heading">{{title}}</div>
		<div class="panel-body"><slot></slot></div>
	</div>
</template>

<script>
	return {
		props: ['title'],
	}
</script>
