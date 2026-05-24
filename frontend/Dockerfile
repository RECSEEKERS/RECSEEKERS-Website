FROM node:22.13.1-bookworm-slim AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:22.13.1-bookworm-slim AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
ARG NEXT_PUBLIC_RECAPTCHA_SITE_KEY
ENV NEXT_PUBLIC_RECAPTCHA_SITE_KEY=$NEXT_PUBLIC_RECAPTCHA_SITE_KEY
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Test-only config override for image optimization behavior during Docker builds.
RUN rm -f next.config.ts next.config.js next.config.mjs \
  && cat > next.config.mjs <<'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
EOF
RUN npm run build

FROM node:22.13.1-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Create non‑root user
RUN groupadd --system --gid 1001 nodejs \
  && useradd --system --uid 1001 nextjs

# Copy build output
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Ensure nextjs can read/write what it needs
RUN mkdir -p /app/.next/cache \
  && chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000
CMD ["node", "server.js"]