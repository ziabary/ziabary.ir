---
title: "When an SMS one-time password weakens security"
slug: sms-otp-security-design
lang: en
date: 2019-12-17
faDate: "17 December 2019"
category: "Security · Architecture"
excerpt: "A short-lived code is not automatically a second factor. Iran's 2019 banking rollout offers a durable lesson in threat modelling: replacing knowledge with possession can reduce, rather than increase, security."
readTime: "8 min read"
cover: "/images/articles/dynamic-password-fraud/cover.jpg"
external: "https://virgool.io/targoman/%DA%A9%D9%84%D8%A7%D9%87%D8%A8%D8%B1%D8%AF%D8%A7%D8%B1%DB%8C-%D8%A8%D8%A7-%D8%B1%D9%85%D8%B2-%D9%BE%D9%88%DB%8C%D8%A7-%D8%AF%D8%B1-%D8%AF%D9%88-%DA%AF%D8%A7%D9%85-xogucr6uuatn"
source: "Virgool (Persian original)"
related:
  - building-targoman-without-patronage
  - apache-mod-jk-lock-errors
draft: false
---

> **Context.** This article was written during Iran's 2019 rollout of mandatory one-time passwords for online card payments. The banking details are local and historical; the security-design mistake is neither.

In late 2019, Iranian banks began replacing the static “second password” used for online card purchases with a short-lived code delivered by SMS. The policy was presented as an answer to widespread phishing. After activating it at several banks, however, I saw a remarkably smooth new path for fraud.

The problem was not that one-time passwords are inherently unsafe. It was that the implementation removed a secret the customer knew and replaced it with access to a device the customer possessed. That is not two-factor authentication. It is a change of factor—and for some users and threat models, a weaker one.

The provocative title of the original Persian article described “fraud in two steps.” It was a warning, not a tutorial. The routes described here existed whether or not they were made visible. Concealing a threat model protects the flawed design, not the people exposed to it.

<figure>
<img src="/images/articles/dynamic-password-fraud/cover.jpg" alt="An illustration for the original Persian article about SMS one-time passwords" />
<figcaption>The original article was published before the nationwide rollout</figcaption>
</figure>

## Step one: obtain the card data

The flow at one major bank was typical:

1. Start an online purchase.
2. Enter the card number, CVV2 and expiry date at the payment gateway.
3. Send the last four digits of the card number to the bank's SMS number.
4. Receive the one-time payment code by SMS and enter it at the gateway.

Only the SMS code was treated as secret. The remaining information was printed on the card. It could be obtained in several ordinary ways:

- A victim sends a photograph of the card after a social-engineering request framed as necessary for a transfer.
- A merchant or employee briefly handles the card at a point-of-sale terminal and records the visible details.
- A relative, friend or colleague with physical access photographs or copies the card.
- A phishing page collects exactly the information that the OTP programme was intended to protect.

None of these paths is exotic. Security architecture should be designed around plausible behaviour and ordinary access, not an ideal user who never lends a card, never trusts a familiar person and never encounters a convincing interface.

## Step two: obtain the phone

Before the change, someone holding the visible card data still needed a memorised payment password. Under the new SMS-only design, the remaining requirement was temporary access to the registered phone.

Physical access has always been a security boundary. When it is part of the threat model, protecting the system requires more than assuming that every device is locked and every owner is vigilant.

Several groups could plausibly get that access:

- **Relatives, friends and colleagues.** Familiar people are trusted with phones precisely because they are familiar. The users most likely to rely on SMS rather than a banking application may also be less likely to configure a strong device lock. One or two unattended minutes can be enough.
- **Phone shops and repair technicians.** A device may be handed over unlocked—or with its passcode—for installation, data transfer or repair. A malicious employee can inspect messages and may have another opportunity to see the customer's card.
- **Street thieves.** A stolen wallet and phone are no longer merely two objects with resale value. Together they can become access to the victim's account before the loss is reported.
- **Privileged insiders.** A small number of people have occupational access to SMS panels, SIM replacement processes or related infrastructure. Most are honest; the threat model still has to include the few who are not.

The key point is not that these attacks are guaranteed or even dominant. It is that the new architecture made possession of two frequently co-located objects—the wallet and phone—the complete path to payment.

## A one-time code is not automatically a second factor

Some readers responded that criticising SMS OTP was like calling a lock unsafe because its key could be stolen: the user should simply protect the key. Others asked what alternative could serve people without smartphones or mobile internet.

Both objections miss the architectural change. The stated purpose of the programme was to protect people who were already vulnerable to phishing. A design for that population cannot assume the security habits whose absence created the policy problem.

At minimum, the rollout should have preserved genuine two-factor authentication: something the customer knows **and** something the customer has. Instead, the static secret was removed and SMS possession became sufficient.

If a full application-based second factor was considered impractical, even a challenge–response flow using a separate channel could have preserved a knowledge factor. For example, the customer could request the OTP through USSD using a private code rather than sending the publicly visible last four digits of the card. The exact mechanism is debatable; retaining two independent factors is the principle.

The distinction becomes clearer with a safe. Some safes open with a combination, some with a key, and more secure models require both. The 2019 implementation was described as if a combination-only safe had been upgraded to a changing combination. In practice, the changing combination was generated by an object that could be taken with the wallet. The system had moved closer to a key-only safe, not to a key-and-combination safe.

Printing card data on the card and calling it a secret does not repair the design. That is equivalent to placing the safe's combination under the glass of the table beside it and adding a sign: “The combination is here, but you still need to take the key from my pocket.”

## The broader lesson

Security controls should be evaluated as systems, not as feature names. “Dynamic password,” “OTP” and “2FA” sound reassuring, but they do not describe who can do what under real conditions.

Before replacing an authentication flow, ask:

- Which factor is being added, and which factor is being removed?
- Are the supposedly independent factors normally carried together?
- Which users is the policy meant to protect, and what behaviour can reasonably be expected from them?
- What happens after physical access, device repair, SIM replacement or theft?
- Does the change reduce the attack surface, or merely move it somewhere less visible?

A short expiration time can reduce replay. It cannot turn possession into knowledge, make two correlated objects independent, or compensate for a threat model that excludes the people the system was designed to serve.

