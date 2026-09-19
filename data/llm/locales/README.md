# LLM edition copy

Technical identities, measurements, source URLs, file hashes and formulas belong
to the shared repository and supplement. They are not translated or duplicated
per edition.

- `messages.{fa,en,es}.json`: stable message keys for interface and constructed
  prose. Keep placeholders identical across editions.
- `records.{fa,en,es}.json`: editorial text only, addressed by stable text IDs.
- `record-bindings.json`: `namespace/entityId → field path → text ID`. Bindings
  identify which canonical editorial field is translated. They are not keyed by
  the Persian wording. The validator verifies the current Persian source value,
  so a renamed/reordered nested field cannot silently retain an old translation.
- `../starting-tasks.json`: manually reviewed task IDs and model IDs, language
  scope and explanation keys. Array order is presentation, not a join key.

Edit canonical scientific facts first. Review affected copy in all three
editions, update the explicit field binding if its structure changed, regenerate
with `npm run generate:llm`, and run `npm run verify:llm` and `npm run check`.
Do not translate original quotes, code identifiers, configuration keys, artifact
names or revision hashes. Natural-language sample inputs in commands have
explicit editorial bindings; the executable command and model ID stay intact.

`createLlmI18n` and each `createLlm*` factory require an explicit edition. Missing
message/record translations throw; components require a provided locale context.
EN/ES catalogs are dynamically imported for that edition. No default Persian
factory is eagerly created in production modules. The test helper explicitly
constructs Persian factories for existing behavioral tests.

Evidence display uses the canonical `presentationNotes` field, including an
explicit empty array when no additional note is needed. It does not search or
rewrite Persian sentences at runtime. Keep source-specific constraints and
commercial disclosures when they affect interpretation.

Article mapping is editorial: `src/lib/llm/edition-manifest.ts` and the site’s
`translation-groups.json`. The EN/ES language-evaluation article is a real pair;
the specialized Persian evaluation article is not falsely declared equivalent.
New article editions remain drafts until a separate publication decision.
