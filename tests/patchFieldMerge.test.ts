import { describe, it, expect } from "vitest";
import { mergeStr, mergeNullableStr, mergeNullableBool, mergeNullableInt } from "@/lib/patchFieldMerge";

describe("lib/patchFieldMerge — mergeStr", () => {
  it("uses the body value when present", () => {
    expect(mergeStr({ firstName: "QA" }, "firstName", "old")).toBe("QA");
  });

  it("REGRESSION: keeps the existing value when the key is absent from a partial PATCH", () => {
    expect(mergeStr({ status: "validee" }, "firstName", "QA Existant")).toBe("QA Existant");
  });

  it("ignores a non-string value and keeps the existing one", () => {
    expect(mergeStr({ firstName: 42 }, "firstName", "QA Existant")).toBe("QA Existant");
  });
});

describe("lib/patchFieldMerge — mergeNullableStr", () => {
  it("uses the body value when present", () => {
    expect(mergeNullableStr({ programId: "prog-1" }, "programId", null)).toBe("prog-1");
  });

  it("REGRESSION: keeps the existing value when the key is absent from a partial PATCH", () => {
    expect(mergeNullableStr({ status: "validee" }, "programId", "prog-existant")).toBe("prog-existant");
  });

  it("explicit null clears the field intentionally", () => {
    expect(mergeNullableStr({ programId: null }, "programId", "prog-existant")).toBeNull();
  });

  it("an empty string is normalized to null (existing convention)", () => {
    expect(mergeNullableStr({ programId: "" }, "programId", "prog-existant")).toBeNull();
  });
});

describe("lib/patchFieldMerge — mergeNullableBool", () => {
  it("uses the body value when present", () => {
    expect(mergeNullableBool({ vaccinesUpToDate: true }, "vaccinesUpToDate", null)).toBe(true);
  });

  it("REGRESSION: keeps the existing value when the key is absent from a partial PATCH", () => {
    expect(mergeNullableBool({ status: "validee" }, "declarationAccepted", true)).toBe(true);
  });
});

describe("lib/patchFieldMerge — mergeNullableInt", () => {
  it("uses the body value when present", () => {
    expect(mergeNullableInt({ studentUserId: 58 }, "studentUserId", null)).toBe(58);
  });

  it("REGRESSION: keeps the existing linked account when the key is absent from a partial PATCH", () => {
    expect(mergeNullableInt({ status: "validee" }, "studentUserId", 58)).toBe(58);
  });

  it("explicit null unlinks the account intentionally", () => {
    expect(mergeNullableInt({ studentUserId: null }, "studentUserId", 58)).toBeNull();
  });
});
