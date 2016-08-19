<template>
	<h1>Hello, world</h1>
</template>

<requirements>
</requirements>

<script>
	return {
		route: {
			activate : function() {
				this.setBreadcrumb([
					{title: '首页'},
				])
			},
		},
	}
</script>
