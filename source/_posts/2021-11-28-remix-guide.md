---
title: remix-guide
date: 2021-11-28 20:17:24
tags: [javascript,framework,ssr,next.js,react,guide]
category: Tech
---

![](/images/remix.jpg)

最近刚在JavaScript Weekly看到了Remix.run(以下简称Remix)准备开源发布1.0版本。没过两天就看到Remix飙到Github Trending趋势榜第一了。感觉是已经火了啊，不知道后续跟Next.js比怎么样。不过看起来不算太复杂，很多东西都封装起来了，语法很轻。所以准备学习一下，顺便做点学习笔记。

<!-- more -->

## 创建项目

从npm下载remix最新版并生成项目。

`npx create-remix@latest`

> `? Where would you like to create your app?` my-cv

我准备做个展示简历的Web应用，动态显示项目经历，这样还算有点需求，不然单纯只是个Demo，毕竟没有需求就没法好好深入学习。而且SSR(Server Side Render服务端渲染)的特色就是方便SEO，做个展示动态数据类的应用是最适合的。命名`my-cv`。

> `? Where do you want to deploy? Choose Remix if you're unsure, it's easy to change deployment targets.`
- Remix App Server
- Express Server
- Architect (AWS Lambda)
- Fly.io
- Netlify
- Vercel
- Cloudflare Workers
当然选择原汁原味的Remix App Server了

> `? TypeScript or JavaScript?`
> TypeScript
- JavaScript
我选择了TypeScript。其实我个人的项目一般不选择TypeScript，不过这次还需要学习以下，就尽量模拟的更正式一些。对于个人开发者来说TypeScript弊大于利，虽然确实可以有效减少错误，和找错误的时间成本，但是定义类型等启动项目时准备的时间更多，还有好不容易找到的冷门库不支持TS的风险。

> ? Do you want me to run `npm install`? `Y`
最后安装就行了。

## 启动项目

进入项目目录 

`cd my-cv`

启动起来看看

`npm run dev`

这里 Node版本12会报错，16没问题。

> "Could not locate @remix-run/serve. Please verify you have it installed to use the dev command."

可以访问`http://localhost:3000`了。
直接带有一个Demo，展示了路由的各种状态，404，401之类的，还有带参数的路由。可以留着参考，也可以删掉。

## 创建页面

这个Demo样式还行，就留着了，反正自己写样式对于学习Remix没有太大意义。所以我把导航改成中文，然后第二个页面改成一个新路由，一会可以创建它，用来展示简历。然后第三个Github的连接改成自己的了。

```html
<ul>
  <li>
    <Link to="/">首页</Link>
  </li>
  <li>
    <Link to="/resume">简历</Link>
  </li>
  <li>
    <a href="https://github.com/tychio">GitHub</a>
  </li>
</ul>
```

然后，创建对应的页面。

```
mkdir app/routes/resume
touch app/routes/resume/index.tsx
```

然后填入一些静态文本，名字和介绍。还有技能，这个可以用载入动态数据来做，先做前端部分，直接从字面量返回。利用`useLoaderData`返回数据。

```ts
import type { LoaderFunction } from "remix";
import { useLoaderData, json } from "remix";
type ResumeData = {
  skills: Array<{ name: string }>;
};
export const loader: LoaderFunction = () => {
  const data: ResumeData = {
    skills: [
      'JavaScript', 'CSS/HTML', 'React', 'Remix'
    ]
  };
  return json(data);
}

export default function ResumeIndex() {
  const resume = useLoaderData<ResumeData>();
  return (
    <div>
      <h1>Zhang Zhengzheng</h1>
      <p>
        A full-stack developer, Senior consultant, Freelancer.
      </p>
      <p>
        {resume.skills.map((skill, index) => (
          <span>{index !== 0 ? ', ' : ''}{skill.name}</span>
        ))}
      </p>
    </div>
  );
}
```

> 注意：这里的`loader`是被后端API钩子`useLoaderData`调用的，所以看不到使用

我还定义了`ResumeData`类型用于该页面的动态数据，它包含了`skills`。

## 使用数据库ORM

下一步，找一个ORM，把数据彻底放在数据库里。我选择了Prisma，

`npm install --save-dev prisma`

`npm install @prisma/client`

#### 初始化ORM

`npx prisma init --datasource-provider mysql`

我选择了mysql，你可以直接使用SQL Lite `npx prisma init --datasource-provider sqlite`。

然后在添加的`.env`文件里设置`DATABASE_URL`

`mysql://<username>:<password>@<host | localhost>:<port>/<database_name>`

然后执行 `npx prisma db pull` 读取数据库并自动生成schema。

再执行`npx prisma generate`生成客户端。
这样就可以通过以下代码使用ORM。

```ts
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
```

#### 创建表

我提前创建了skills表，所以刚才pull的时候，在`prisma/schema.prisma`文件里就有了model。

```
model skills {
  id   Int     @id @default(autoincrement())
  name String? @db.VarChar(30)
}
```

如果数据库中没有的表，先在这里写上model schema，再执行`npx prisma db push`就可以在数据库中创建对应的表。

> 记得在`.gitignore`里添加`.env`。如果使用的SQLite，还有`/prisma/xxx.db`。

#### 插入数据

创建`prisma/seed.ts`文件，用于最初的数据。
```ts
import { PrismaClient } from "@prisma/client";
let db = new PrismaClient();

async function seed() {
  await Promise.all(
    getSkills().map(joke => {
      return db.skills.create({ data: joke });
    })
  );
}

seed();

function getSkills() {
  return [
    {    
        name: 'JavaScript'
    },
    ...
  ]
}
```
安装`ts-node`包执行seed。

`npm install --save-dev ts-node`

方便起见，在`package.json`中加入

```json
"prisma": {
  "seed": "ts-node prisma/seed.ts"
},
```

然后执行seed

`npx prisma db seed`

#### 使用数据
在app目录下创建utils目录，以及文件`utils/db.server.ts`

```ts
import { PrismaClient } from "@prisma/client";

let db: PrismaClient;

declare global {
  var __db: PrismaClient | undefined;
}

if (process.env.NODE_ENV === "production") {
  db = new PrismaClient();
  db.$connect();
} else {
  if (!global.__db) {
    global.__db = new PrismaClient();
    global.__db.$connect();
  }
  db = global.__db;
}

export { db };
```

> `development`环境的区别是缓存了连接实例，这样不会每次重启

在之前的`resume/index.tsx`页面使用它。

`import { db } from "~/utils/db.server";`

> `~`是默认在Remix的模板中tsconfig.json配置的，代表app目录。

更新loader方法

```ts
export const loader: LoaderFunction = async () => {
  const data: ResumeData = {
    skills: await db.skills.findMany()
  };
  return data;
}
```

这样基本的Remix流程就走通了。从数据库到页面。

另外我还替换了原来的logo。[谷歌绘图](https://docs.google.com/drawings/) 制作svg还挺好用。

![](/images/my_cv.png)

[代码](https://github.com/tychio/my-cv)放到Github上了，后面还要继续，和文中可能会有差异。
