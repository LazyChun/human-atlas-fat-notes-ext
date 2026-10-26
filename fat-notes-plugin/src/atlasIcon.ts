/*
 * 「人体图谱」卡片图标（内联 SVG data-URI）
 *
 * 宿主添加组件菜单把 iconUrl 直接塞进 <img src>。插件静态资源没有
 * 独立公开根路径，相对/绝对路径都会 404，因此用 data-URI 内联
 * （同 fat-tools src/assets/toolSwitcherIcon.ts）。
 */

const ATLAS_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
  <rect width="48" height="48" rx="10" fill="#263b48"/>
  <circle cx="24" cy="13" r="4" fill="#f3f4f4"/>
  <path d="M24 18.2c-5.4 1.1-8.4 4.4-8.4 8.1V28h4.4l1.2 11h5.6l1.2-11H32.4v-1.7c0-3.7-3-7-8.4-8.1z" fill="#f3f4f4"/>
</svg>`;

export const ATLAS_ICON_URL = `data:image/svg+xml;utf8,${encodeURIComponent(ATLAS_SVG)}`;
