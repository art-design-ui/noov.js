/**
 * Module dependencies.
 */
import Koa from 'koa'
import { resolve } from 'path'
import assert from 'assert'
import send from 'koa-send'

/**
 * Serve static files from `root`.
 *
 * @param {String} root
 * @param {Object} [opts]
 * @return {Function}
 * @api public
 */

function serve(root: string, opts: any) {
  opts = { ...opts }

  assert(root, 'root directory is required to serve files')

  // options
  opts.root = resolve(root)
  if (opts.index !== false) opts.index = opts.index || 'index.html'

  if (!opts.defer) {
    return async function serve(ctx: Koa.Context, next: Koa.Next) {
      let done = false

      if (ctx.method === 'HEAD' || ctx.method === 'GET') {
        if (opts.prefix && ctx.path.indexOf(opts.prefix) === 0) {
          ctx.path = ctx.path.slice(opts.prefix.length)
        }

        try {
          done = ((await send(ctx, ctx.path, opts)) as unknown) as boolean
        } catch (err) {
          if (err.status !== 404) {
            throw err
          }
        }
      }

      if (!done) {
        await next()
      }
    }
  }

  return async function serve(ctx: Koa.Context, next: Koa.Next) {
    await next()

    if (ctx.method !== 'HEAD' && ctx.method !== 'GET') return
    // response is already handled
    if (ctx.body != null || ctx.status !== 404) return // eslint-disable-line

    try {
      await send(ctx, ctx.path, opts)
    } catch (err) {
      if (err.status !== 404) {
        throw err
      }
    }
  }
}

export default serve
