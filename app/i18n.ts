import {useSyncExternalStore} from 'react';
import type {SystemId} from './anatomy';

export type AtlasLocale = 'zh_CN' | 'en_US';

const en: Record<string, string> = {
  'meta.title': 'Human Atlas',
  'eyebrow.interactive': 'INTERACTIVE ANATOMY',
  'meta.pieces': '{count} modeled pieces',
  'nav.panels': 'Explorer panels',
  'nav.search': 'Find a structure',
  'nav.search.aria': 'Search anatomy',
  'nav.about': 'About this atlas',
  'layers.aria': 'Anatomical layers',
  'layers.title': 'Systems',
  'layers.close': 'Close systems',
  'preset.all': 'All',
  'preset.skeleton': 'Skeleton',
  'preset.organs': 'Organs',
  'system.only': 'Show only {name}',
  'system.show': 'Show {name}',
  'layers.visible': '{count} pieces visible',
  'layers.hideAll': 'Hide all',
  'search.aria': 'Find anatomy',
  'search.title': 'Find a structure',
  'search.close': 'Close search',
  'search.placeholder': 'Heart, femur, cranial nerve…',
  'search.input': 'Search named anatomical structures',
  'search.empty': 'No structures match your search.',
  'search.piece': 'piece',
  'search.pieces': 'pieces',
  'search.note.results': 'Showing up to 80 matches. Refine your search to find smaller structures.',
  'search.note.start': 'Start with a major organ, or search every named structure.',
  'camera.aria': 'Camera controls',
  'view.three-quarter': 'three-quarter view',
  'view.front': 'front view',
  'view.side': 'side view',
  'view.back': 'back view',
  'rotate.pause': 'Pause rotation',
  'rotate.play': 'Rotate body',
  'rotate.title': 'Auto rotate',
  'reset.view': 'Reset view and layers',
  'reset.title': 'Reset',
  'caption.selected': 'SELECTED STRUCTURE',
  'caption.inventory': 'ANATOMICAL INVENTORY',
  'caption.separated': 'SEPARATED STRUCTURES',
  'caption.subject': 'ADULT HUMAN · MALE',
  'dock.layers': 'Open system layers',
  'explode.label': 'Explode anatomy',
  'explode.assembled': 'Assembled',
  'explode.every': 'Every piece',
  'reset.assemble': 'Assemble and reset',
  'footer.orbit': 'Drag to orbit',
  'footer.pan': 'Drag to pan',
  'footer.zoom': 'Pinch to zoom',
  'footer.inspect': 'Tap to inspect',
  'footer.source': 'Source & credits',
  'loading.title': 'Preparing the anatomy',
  'loading.detail': '{progress}% · Loading {count} pieces',
  'error.reload': 'Reload viewer',
  'error.catalogue': 'The anatomy catalogue could not be loaded.',
  'error.webgl': 'This browser could not start the 3D viewer. Please try a browser with WebGL enabled.',
  'error.load': 'Could not load the anatomy.',
  'error.geometry': 'Could not assemble anatomy geometry.',
  'error.file': 'An anatomy file could not be loaded.',
  'error.incomplete': 'An anatomy file was incomplete. Please reload the viewer.',
  'error.contextLost': 'The 3D session was paused by your device. Reload to continue.',
  'scene.aria': 'Interactive human anatomy. Drag to orbit, pinch or scroll to zoom, and tap a structure to inspect it.',
  'detail.anatomy': 'ANATOMY',
  'detail.context': 'System overview · structure identified from source anatomy',
  'detail.reference': 'Atlas reference',
  'detail.selected': 'Selected pieces',
  'detail.included': 'Included structures',
  'detail.more': 'And {count} more modeled pieces.',
  'detail.source': 'View anatomical source',
  'detail.isolate': 'Isolate structure',
  'detail.surrounding': 'Show surrounding anatomy',
  'detail.clear': 'Clear selection',
  'about.eyebrow': 'SOURCE & SCOPE',
  'about.title': 'A body, revealed.',
  'about.lead': 'Explore the adult male reference anatomy from BodyParts3D.',
  'about.male.title': 'Male · BodyParts3D',
  'about.male.body': '2,234 individual meshes and 3,432 named concepts from an adult male reference anatomy.',
  'about.scope': 'This reference does not contain every human structure or variation. Named concepts can contain multiple pieces; each source mesh is rendered once.',
  'about.design': 'Colors and system groupings are designed for exploration. The geometry is simplified for the web, and short explanations provide general educational context. This is an anatomical reference, not a diagnostic or surgical tool.',
  'about.source': 'Source',
  'about.license.body': 'BodyParts3D, © The Database Center for Life Science licensed under CC Attribution 4.0 International.',
  'about.license': 'Dataset license',
  'about.geometry': 'Original geometry & metadata',
  'about.paper': 'Read the source publication',
  'system.skeletal': 'Skeleton',
  'system.muscular': 'Muscles',
  'system.cardiac': 'Heart',
  'system.sensory': 'Sensory organs',
  'system.arterial': 'Arteries',
  'system.venous': 'Veins',
  'system.nervous': 'Nervous system',
  'system.respiratory': 'Respiratory',
  'system.digestive': 'Digestive',
  'system.urinary': 'Urinary',
  'system.lymphatic': 'Lymphatic',
  'system.endocrine': 'Endocrine',
  'system.reproductive': 'Reproductive',
  'system.integumentary': 'Body surface',
  'system.connective': 'Connective tissue',
  'system.skeletal.desc': 'Bones form the supporting framework of the body, protect organs, and provide attachment points for muscles. Their internal tissue also stores minerals and produces blood cells.',
  'system.muscular.desc': 'Skeletal muscles generate movement by pulling on their attachments. Together with tendons, they move joints, stabilize posture, and produce heat.',
  'system.cardiac.desc': 'The heart is a muscular pump with four chambers. Its valves direct blood forward through the pulmonary and systemic circuits.',
  'system.sensory.desc': 'These structures contribute to special senses, including sight, hearing, and balance. Their specialized tissues detect stimuli and work with the nervous system to convey information.',
  'system.arterial.desc': 'The heart drives blood through the circulation. Arteries carry blood away from the heart to supply tissues or, in the pulmonary circuit, to the lungs.',
  'system.venous.desc': 'Veins return blood toward the heart. Superficial and deep networks collect blood from the tissues; the pulmonary veins bring oxygenated blood back from the lungs.',
  'system.nervous.desc': 'The brain, spinal cord, and peripheral nerves carry and process signals. They support sensation, movement, coordination, and automatic regulation of body functions.',
  'system.respiratory.desc': 'The airways conduct air to the lungs, where oxygen and carbon dioxide move between air and blood. Breathing depends on pressure changes produced by respiratory muscles.',
  'system.digestive.desc': 'The digestive tract breaks down food, absorbs nutrients and water, and moves waste onward. Accessory organs contribute bile and digestive enzymes.',
  'system.urinary.desc': 'The kidneys filter blood and regulate fluid, electrolyte, and acid–base balance. Urine travels through the ureters to the bladder and exits through the urethra.',
  'system.lymphatic.desc': 'Lymphatic vessels return excess tissue fluid to the circulation. Lymph nodes and other lymphoid organs support immune surveillance and responses.',
  'system.endocrine.desc': 'Endocrine organs release hormones into the blood to coordinate processes such as metabolism, growth, stress responses, and reproduction.',
  'system.reproductive.desc': 'The male reproductive structures represented here contribute to sperm production, maturation, transport, and the production of sex hormones.',
  'system.integumentary.desc': 'The body surface provides an outer anatomical reference. The integumentary system forms a protective barrier and contributes to sensation and temperature regulation.',
  'system.connective.desc': 'Cartilage, ligaments, and other connective tissues support, connect, and separate structures. Their roles include stabilizing joints and distributing mechanical loads.',
  'explain.heart': 'A muscular pump in the chest. Its right side sends blood to the lungs; its left side sends blood through the systemic circulation.',
  'explain.liver': 'A large organ beneath the right side of the diaphragm. It processes absorbed nutrients, produces bile, and synthesizes many proteins carried in the blood.',
  'explain.brain': 'The central organ of the nervous system. Its interconnected regions support perception, movement, memory, language, and the regulation of bodily functions.',
  'explain.stomach': 'A muscular chamber between the esophagus and small intestine. It stores and mixes food with acid and enzymes before releasing it into the duodenum.',
  'explain.spleen': 'A lymphoid organ in the upper left abdomen. It filters blood, removes aging blood cells, and participates in immune responses.',
  'explain.pancreas': 'An abdominal organ with digestive and endocrine roles. It supplies enzymes to the small intestine and releases hormones including insulin and glucagon.',
  'explain.urinary bladder': 'A muscular reservoir in the pelvis that stores urine arriving from the kidneys through the ureters.',
  'explain.trachea': 'The main airway connecting the larynx to the bronchi. Its cartilage supports keep the airway open during breathing.',
  'explain.diaphragm': 'A broad muscle separating the chest and abdomen. When it contracts, it increases chest volume and helps draw air into the lungs.',
};

const zh: Record<string, string> = {
  'meta.title': '人体图谱',
  'eyebrow.interactive': '交互式解剖',
  'meta.pieces': '{count} 个建模部件',
  'nav.panels': '浏览面板',
  'nav.search': '查找结构',
  'nav.search.aria': '搜索解剖结构',
  'nav.about': '关于此图谱',
  'layers.aria': '解剖分层',
  'layers.title': '系统',
  'layers.close': '关闭系统',
  'preset.all': '全部',
  'preset.skeleton': '骨骼',
  'preset.organs': '器官',
  'system.only': '只显示{name}',
  'system.show': '显示{name}',
  'layers.visible': '当前可见 {count} 个部件',
  'layers.hideAll': '全部隐藏',
  'search.aria': '查找解剖结构',
  'search.title': '查找结构',
  'search.close': '关闭搜索',
  'search.placeholder': '心脏、股骨、脑神经…',
  'search.input': '搜索已命名的解剖结构',
  'search.empty': '没有匹配的结构。',
  'search.piece': '件',
  'search.pieces': '件',
  'search.note.results': '最多显示 80 条。缩小关键词可以找到更细的结构。',
  'search.note.start': '可以从主要器官开始，也可以搜索全部已命名结构。',
  'camera.aria': '相机控制',
  'view.three-quarter': '斜视',
  'view.front': '正面',
  'view.side': '侧面',
  'view.back': '背面',
  'rotate.pause': '暂停旋转',
  'rotate.play': '旋转身体',
  'rotate.title': '自动旋转',
  'reset.view': '重置视角和图层',
  'reset.title': '重置',
  'caption.selected': '已选结构',
  'caption.inventory': '解剖清单',
  'caption.separated': '已分离结构',
  'caption.subject': '成年人体 · 男性',
  'dock.layers': '打开系统图层',
  'explode.label': '拆解解剖',
  'explode.assembled': '组合',
  'explode.every': '逐件',
  'reset.assemble': '组合并重置',
  'footer.orbit': '拖拽旋转',
  'footer.pan': '拖拽平移',
  'footer.zoom': '捏合缩放',
  'footer.inspect': '点选查看',
  'footer.source': '来源与署名',
  'loading.title': '正在准备解剖模型',
  'loading.detail': '{progress}% · 正在加载 {count} 个部件',
  'error.reload': '重新加载',
  'error.catalogue': '解剖目录无法加载。',
  'error.webgl': '当前浏览器无法启动三维查看器。请换用已启用 WebGL 的浏览器。',
  'error.load': '解剖模型无法加载。',
  'error.geometry': '无法组装解剖几何体。',
  'error.file': '有一个解剖文件无法加载。',
  'error.incomplete': '有一个解剖文件不完整。请重新加载查看器。',
  'error.contextLost': '设备暂停了三维会话。重新加载后可以继续。',
  'scene.aria': '交互式人体解剖。拖拽旋转，捏合或滚动缩放，点选结构进行查看。',
  'detail.anatomy': '解剖',
  'detail.context': '系统概述 · 结构来自源解剖数据',
  'detail.reference': '图谱编号',
  'detail.selected': '已选部件',
  'detail.included': '包含的结构',
  'detail.more': '另有 {count} 个建模部件。',
  'detail.source': '查看解剖来源',
  'detail.isolate': '单独显示',
  'detail.surrounding': '显示周围结构',
  'detail.clear': '清除选择',
  'about.eyebrow': '来源与范围',
  'about.title': '把身体展开来看。',
  'about.lead': '浏览 BodyParts3D 的成年男性参考解剖。',
  'about.male.title': '男性 · BodyParts3D',
  'about.male.body': '来自成年男性参考解剖的 2,234 个独立网格和 3,432 个命名概念。',
  'about.scope': '这份参考没有覆盖全部人体结构或变异。一个命名概念可以包含多个部件；每个源网格只渲染一次。',
  'about.design': '颜色和系统分组用于浏览。几何体为网页做了简化，简短说明提供一般性的教学背景。这是解剖参考，不是诊断或手术工具。',
  'about.source': '来源',
  'about.license.body': 'BodyParts3D，© 生命科学数据库中心，采用 CC Attribution 4.0 International 许可。',
  'about.license': '数据集许可',
  'about.geometry': '原始几何体与元数据',
  'about.paper': '阅读原始论文',
  'system.skeletal': '骨骼',
  'system.muscular': '肌肉',
  'system.cardiac': '心脏',
  'system.sensory': '感觉器官',
  'system.arterial': '动脉',
  'system.venous': '静脉',
  'system.nervous': '神经系统',
  'system.respiratory': '呼吸',
  'system.digestive': '消化',
  'system.urinary': '泌尿',
  'system.lymphatic': '淋巴',
  'system.endocrine': '内分泌',
  'system.reproductive': '生殖',
  'system.integumentary': '体表',
  'system.connective': '结缔组织',
  'system.skeletal.desc': '骨骼构成身体的支撑框架，保护器官，并为肌肉提供附着点。其内部组织还储存矿物质、生成血细胞。',
  'system.muscular.desc': '骨骼肌通过牵拉附着点产生运动。它们与肌腱一起活动关节、稳定姿态并产生热量。',
  'system.cardiac.desc': '心脏是具有四个腔室的肌性泵。瓣膜引导血液沿肺循环和体循环向前流动。',
  'system.sensory.desc': '这些结构参与特殊感觉，包括视觉、听觉和平衡。特化组织感受刺激，并与神经系统一起传递信息。',
  'system.arterial.desc': '心脏推动血液在循环中流动。动脉将血液运离心脏以供应组织；在肺循环中则运往肺。',
  'system.venous.desc': '静脉将血液送回心脏。浅层和深层网络收集来自组织的血液；肺静脉把含氧血从肺送回心脏。',
  'system.nervous.desc': '脑、脊髓和周围神经传递并处理信号。它们支持感觉、运动、协调，以及对身体功能的自动调节。',
  'system.respiratory.desc': '气道把空气送入肺，氧气和二氧化碳在这里于空气与血液之间交换。呼吸依赖于呼吸肌引起的压力变化。',
  'system.digestive.desc': '消化道分解食物，吸收营养与水分，并运送废物。附属器官提供胆汁和消化酶。',
  'system.urinary.desc': '肾脏过滤血液，并调节体液、电解质和酸碱平衡。尿液经输尿管进入膀胱，再经尿道排出。',
  'system.lymphatic.desc': '淋巴管把多余的组织液送回循环。淋巴结和其他淋巴器官参与免疫监视与应答。',
  'system.endocrine.desc': '内分泌器官将激素释放入血，协调代谢、生长、应激反应和生殖等过程。',
  'system.reproductive.desc': '这里呈现的男性生殖结构参与精子的产生、成熟、运输，以及性激素的分泌。',
  'system.integumentary.desc': '体表提供外部解剖参照。皮肤系统形成保护屏障，并参与感觉与体温调节。',
  'system.connective.desc': '软骨、韧带和其他结缔组织支撑、连接并分隔结构。它们的作用包括稳定关节和分散机械负荷。',
  'explain.heart': '位于胸腔的肌性泵。右侧把血液送往肺，左侧把血液送入体循环。',
  'explain.liver': '膈右下方的大型器官。它处理吸收的营养，生成胆汁，并合成血液中的多种蛋白质。',
  'explain.brain': '神经系统的中枢器官。相互连接的脑区支持感知、运动、记忆、语言，以及对身体功能的调节。',
  'explain.stomach': '食管与小肠之间的肌性腔室。它储存食物，并与酸和酶混合，再排入十二指肠。',
  'explain.spleen': '位于左上腹的淋巴器官。它过滤血液，清除衰老的血细胞，并参与免疫应答。',
  'explain.pancreas': '兼具消化与内分泌功能的腹腔器官。它向小肠提供酶，并释放包括胰岛素和胰高血糖素在内的激素。',
  'explain.urinary bladder': '位于盆腔的肌性储尿器官，储存经输尿管来自肾脏的尿液。',
  'explain.trachea': '连接喉与支气管的主气道。软骨支撑使气道在呼吸时保持开放。',
  'explain.diaphragm': '分隔胸腔与腹腔的宽大肌肉。收缩时增大胸腔容积，帮助空气进入肺。',
  'name.heart': '心脏',
  'name.liver': '肝脏',
  'name.brain': '脑',
  'name.stomach': '胃',
  'name.spleen': '脾',
  'name.pancreas': '胰腺',
  'name.urinary bladder': '膀胱',
  'name.trachea': '气管',
  'name.diaphragm': '膈',
};

const catalogs: Record<AtlasLocale, Record<string, string>> = {zh_CN: zh, en_US: en};
const listeners = new Set<() => void>();

export function normalizeLocale(value: string | null | undefined): AtlasLocale {
  const text = String(value || '').toLowerCase().replace(/-/g, '_');
  if (text.startsWith('en')) return 'en_US';
  if (text.startsWith('zh')) return 'zh_CN';
  return 'en_US';
}

function readInitialLocale(): AtlasLocale {
  if (typeof window === 'undefined') return 'en_US';
  const params = new URLSearchParams(window.location.search);
  const fromQuery = params.get('locale') || params.get('lang');
  if (fromQuery) return normalizeLocale(fromQuery);
  if (window.parent !== window) return 'zh_CN';
  return 'en_US';
}

let current: AtlasLocale = readInitialLocale();

function fill(template: string, values?: Record<string, string | number>): string {
  if (!values) return template;
  return template.replace(/\{(\w+)\}/g, (token, key) => {
    const value = values[key];
    return value == null ? token : String(value);
  });
}

export function getLocale(): AtlasLocale {
  return current;
}

export function translate(locale: AtlasLocale, key: string, values?: Record<string, string | number>): string {
  const table = catalogs[locale];
  const raw = table[key] ?? en[key];
  if (raw == null) return key;
  return fill(raw, values);
}

export function t(key: string, values?: Record<string, string | number>): string {
  return translate(current, key, values);
}

function applyDocumentLocale(locale: AtlasLocale) {
  if (typeof document === 'undefined') return;
  document.documentElement.lang = locale === 'zh_CN' ? 'zh-CN' : 'en';
  document.title = translate(locale, 'meta.title');
}

export function setLocale(value: string) {
  const next = normalizeLocale(value);
  if (next === current) return;
  current = next;
  applyDocumentLocale(next);
  listeners.forEach((listener) => {
    try {
      listener();
    } catch {
      /* ignore */
    }
  });
}

export function subscribeLocale(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function hasNamedExplanation(name: string): boolean {
  return Object.prototype.hasOwnProperty.call(en, `explain.${name.toLowerCase()}`);
}

export function explainStructure(name: string, system: SystemId): string {
  const key = `explain.${name.toLowerCase()}`;
  if (hasNamedExplanation(name)) return t(key);
  return t(`system.${system}.desc`);
}

export function structureName(name: string): string {
  if (current !== 'zh_CN') return name;
  return zh[`name.${name.toLowerCase()}`] ?? name;
}

function onHostLocale(event: MessageEvent) {
  if (event.source !== window.parent) return;
  const data = event.data;
  if (!data || data.source !== 'fat-notes-host' || data.type !== 'locale') return;
  if (typeof data.locale !== 'string') return;
  setLocale(data.locale);
}

if (typeof window !== 'undefined') {
  applyDocumentLocale(current);
  window.addEventListener('message', onHostLocale);
  if (window.parent !== window) {
    window.parent.postMessage({source: 'human-atlas', type: 'ready'}, '*');
  }
}

export function useAtlasI18n() {
  const locale = useSyncExternalStore(subscribeLocale, getLocale, getLocale);
  return {
    locale,
    t: (key: string, values?: Record<string, string | number>) => translate(locale, key, values),
  };
}
