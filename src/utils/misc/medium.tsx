"use client";

import { Container } from "@/components/container";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const URL_REGEX = /^http[s]?:\/\/.*$/;

export default function MediumBypass() {
  const [error, setError] = useState<string | null>(null);
  const [url, setUrl] = useState("");
  const [article, setArticle] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchArticle = async () => {
    setError(null);

    if (!url) {
      return setError("Missing URL");
    }

    if (!URL_REGEX.test(url)) {
      return setError("Invalid URL");
    }

    setLoading(true);

    const res = await fetch("/api/medium?url=" + url);
    const body = await res.json();

    if (!res.ok) {
      setError(body.error);

      return;
    }

    setError(null);
    setLoading(false);
    setArticle(body.html);
  };

  return (
    <Container>
      <div className="grid w-full gap-2">
        <Label>Medium Article Link</Label>

        {error && (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="flex gap-2 items-center">
          <Input
            value={url}
            placeholder="https://medium.com/..."
            onChange={(ev) => setUrl(ev.target.value)}
          />

          <Button onClick={fetchArticle} disabled={loading}>
            Read
          </Button>
        </div>
      </div>

      {article && (
        <section className="py-16 border rounded-md">
          <article
            className="prose prose-invert container"
            dangerouslySetInnerHTML={{ __html: article }}
          />
        </section>
      )}
    </Container>
  );
}
