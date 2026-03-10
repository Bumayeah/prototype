<script setup lang="ts">
import { useSidebar } from '@/components/ui/sidebar'
import { useRoute } from 'vue-router'
import { watch } from 'vue'

const route = useRoute()
const { setOpenMobile, isMobile } = useSidebar()

watch(
  () => route.path,
  () => {
    if (isMobile.value) setOpenMobile(false)
  },
)
</script>
