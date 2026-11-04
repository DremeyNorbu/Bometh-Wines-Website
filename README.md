# Bometh Wine & Spritz website

Next.js site for Bometh, built from the approved Spritz Hour design.

## Run it

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Where things live

- `app/`: pages, plus the styles in `app/styles/`
- `components/`: navigation, footer, age check, hero, fizz, forms
- `lib/products.ts`: all six products
- `lib/events.ts`: events and news cards
- `lib/site.ts`: placeholders, social links and the legal notice
- `assets/`: pack mockups, logo crops and photos

## Before launch

Not connected yet:

- **Cart and checkout:** "Add to cart" only shows a message. Depends on how Bometh will take payment.
- **Contact form:** shows a thank-you message but sends nothing. Needs an inbox or form service.
- **Newsletter:** shows a confirmation but stores nothing. Needs an email marketing tool.
- **Store search and map:** placeholder content. Needs the stockist list.

Still to come from the client:

- Prices, liquor licence number, email address, phone number and social links (`lib/site.ts`, `lib/products.ts`)
- Stockists, event dates and news
- Real pack photography: the cans and bottles in `assets/packs/` are mockups
- Privacy Policy and Terms & Conditions text, reviewed by a legal adviser

Also check every photo against Australian alcohol advertising rules. Photos are from Unsplash.
