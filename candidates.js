/* 完整候选人列表。请把 images/ 下的文件换成你有权使用的照片。
 * 可按同样格式添加或删除候选人；完整四阶段流程至少需要18位。
 * 名单以参考网站展示的人名为编辑示例；人物照片不包含在本项目中。
 */
const CANDIDATES = [
 ['Pam','pam.jpg'],['Arhoung','arhoung.jpg'],['May','may.jpg'],['Yuyu','yuyu.jpg'],
 ['Apple','apple.jpg'],['Nycha','nycha.jpg'],['Myyu','myyu.jpg'],['Piploy','piploy.jpg'],
 ['Enjoy','enjoy.jpg'],['Bonnie','bonnie.jpg'],['Lilly','lilly.jpg'],['Faye','faye.jpg'],
 ['Tan','tan.jpg'],['Engfa','engfa.jpg'],['Jayna','jayna.jpg'],['Aya','aya.jpg'],
 ['Fond','fond.jpg'],['Ciize','ciize.jpg'],['Jaoying','jaoying.jpg'],['Oaey','oaey.jpg'],
 ['Namtan','namtan.jpg'],['Tungpang','tungpang.jpg'],['Mint','mint.jpg'],['Mim','mim-2.jpg'],
 ['Mingming','mingming.jpg'],['Gift','gift.jpg'],['Aosin','aosin.jpg'],['Puyfai','puyfai.jpg'],
 ['Orm','orm.jpg'],['Opal','opal.jpg'],['Earn','earn.jpg'],['June','june-2.jpg'],
 ['Janeyeh','janeyeh.jpg'],['June','june.jpg'],['Fay','fay.jpg'],['Tk','tk.jpg'],
 ['Film','film.jpg'],['Anda','anda.jpg'],['Nur','nur.jpg'],['Grace','grace.jpg'],
 ['Belle','belle.jpg'],['Namwan','namwan.jpg'],['Niky','niky.jpg'],['Mewnich','mewnich.jpg'],
 ['Jingjing','jingjing.jpg'],['Natt','natt.jpg'],['Pahn','pahn.jpg'],['Becky','becky.jpg'],
 ['Mie','mie.jpg'],['Kapook','kapook.jpg'],['Shu','shu.jpg'],['Lookhmee','lookhmee.jpg'],
 ['Yada','yada.jpg'],['Whan','whan.jpg'],['Noey','noey.jpg'],['Fay','fay-2.jpg'],
 ['Lookkaew','lookkaew.jpg'],['Charlotte','charlotte.jpg'],['Meena','meen.jpg'],['Oom','oom.jpg'],
 ['Gene','gene.jpg'],['Lena','lena.jpg'],['Milk','milk.jpg'],['Pangjie','pangjie.jpg'],
 ['Atom','atom.jpg'],['Sonya','sonya.jpg'],['Nile','nile.jpg'],['Lingling','lingling.jpg'],
 ['Love','love.jpg'],['Miu','miu.jpg'],['Bam','bam.jpg'],['Mook','mook.jpg'],
 ['Kao','kao.jpg'],['Freen','freen.jpg'],['Jessie','jessie.jpg'],['England','england.jpg'],
 ['Ginny','ginny.jpg'],['Namneung','namneung.jpg'],['Chanya','chanya.jpg'],['Pitcha','pitcha.jpg'],
 ['View','view.jpg'],['Emi','emi.jpg'],['Puinnoon','puinnoon.jpg'],['Mable','mable.jpg'],
 ['Mim','mim.jpg'],['Aoom','babe.jpg'],['Bint','bint.jpg'],['Jan','jan.jpg'],
 ['Yoko','yoko.jpg'],['Prim','prim.jpg'],['Nepjune','nepjune.jpg'],['Ploy','ploy.jpg']
].map(([name,file],id)=>({id,name,image:'images/'+file}));
