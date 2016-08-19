<template>
	<span class="glyphicon glyphicon-menu-hamburger toggle-menu"
		onclick="$('.body').toggleClass('hidemenu')">
	</span>
	<ul class="menu-list-1">
		<li v-for="(i1, item) in items">
			<a :href="item.href" v-if="item.href">{{item.title}}</a>
			<span v-else @click="toggleChildren">{{item.title}}</span>
			<ul class="menu-list-2" v-if="item.children">
				<li v-for="(i2, child) in item.children">
					<a :href="child.href" v-if="child.href">{{child.title}}</a>
					<span v-else @click="toggleChildren">{{child.title}}</span>
					<ul class="menu-list-3" v-if="child.children">
						<li v-for="(i3, grandchild) in child.children">
							<a :href="grandchild.href" v-if="grandchild.href">{{grandchild.title}}</a>
							<span v-else>{{grandchild.title}}</span>
						</li>
					</ul>
				</li>
			</ul>
		</li>
	</ul>
</template>

<requirements>
	$:		'jquery'
</requirements>

<script>
	return {
		data: function() {
			return {
				items: [
					{
						title: '一级菜单示例',
						children: [
							{
								title: '某个菜单项',
								href: '#!/',
							},
							{
								title: '二级菜单示例',
								children: [
									{
										title: '某个菜单项',
										href: '#!/',
									},
									{
										title: '某个菜单项',
										href: '#!/',
									}
								],
							},
						],
					},
					{
						title: '列表示例',
						children: [
							{
								title: '简单列表示例',
								href: '#!/simple-list-demo',
							},
							{
								title: '复杂列表示例',
								href: '#!/list-demo',
							},
						],
					},
					{
						title: '表单示例',
						href: '#!/edit-demo',
					},
				],
			}
		},
		methods: {
			toggleChildren: function(e) {
				var $t = $(e.target)
				$t.toggleClass('active')
			},
		},
		ready: function() {
		},
	}
</script>
