## Getting Started

1. Install dependencies

```bash
npm i
```

2. Copy the example env file and add your keys

```bash
cp .env.local.example .env.local
```

3. Run the dev server

```bash
npm run dev
```

4. (Optional) Run `pay tunnel` to forward https traffic from a devbox to your local machine. Run this and follow prompts in your console if you want to show Google/Apple Pay

```
pay tunnel --local demo:3000
```

Note: Further information on `pay tunnel` on [Confluence](https://confluence.corp.stripe.com/display/PRODINFRA/pay+tunnel)

5.Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. Alternatively, if using `pay tunnel`, open `[your-username]-demo.tunnel.stripe.me`

## Demo configuration

1. On the checkout page, click the gear icon to open the settings panel. You can also use keyboard shortcut `cmd+i` to toggle the panel display.
2. The settings panel will allow you to configure multiple aspects of the checkout page, such as adding additional Elements or changing appearance values
3. Surcharging is on by default. To turn it off, go to the Payment tab in the settings panel
4. To highlight Elements, either toggle the switch in the settings panel, or use hotkey `cmd+b`

## Making changes

1. Edit /app/page.tsx to make changes to the index page
2. Edit /app/checkout/page.tsx to make changes to the main content of the checkout page
3. Edit the components in /app/checkout/components as needed

## Gates required

- elements_saved_payment_methods_beta_1
