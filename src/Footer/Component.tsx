import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'

export async function Footer() {
  const footerData = await getCachedGlobal('footer', 1)()

  const navItems = footerData?.navItems || []


return (
  <footer className="mt-auto bg-slate-900 text-white">
    <div className="container py-12">

      <div className="grid gap-10 md:grid-cols-3">

        {/* About */}
        <div>
          <h3 className="mb-4 text-xl font-bold">
            Raipur District Yojna Portal
          </h3>

          <p className="text-sm text-slate-300 leading-6">
            Official portal for government welfare schemes, citizen services,
            development programs, and public announcements of Raipur District.
          </p>
        </div>
{/* Quick Links */}
<div>
  <h3 className="mb-4 text-lg font-semibold">
    Quick Links
  </h3>

  <ul className="space-y-3 text-sm text-slate-300">
    <li>
      <Link href="/" className="hover:text-green-400 transition">
        Home
      </Link>
    </li>

    <li>
      <Link href="/yojnas" className="hover:text-green-400 transition">
        Government Schemes
      </Link>
    </li>

    <li>
      <Link href="/posts" className="hover:text-green-400 transition">
        Announcements
      </Link>
    </li>
  </ul>
</div>
        {/* Contact */}
        <div>
          <h3 className="mb-4 text-lg font-semibold">
            Contact Information
          </h3>

          <div className="space-y-2 text-sm text-slate-300">
            <p>Raipur District Administration</p>
            <p>Government of Chhattisgarh</p>
            <p>Email: info@raipur.gov.in</p>
            <p>Phone: +91-771-XXXXXXX</p>
          </div>
        </div>

      </div>

      <div className="mt-10 border-t border-slate-700 pt-6 text-center text-sm text-slate-400">
        © 2026 Raipur District Administration, Government of Chhattisgarh.
        <br />
        All Rights Reserved. Developed & Hosted by NIC.
      </div>

    </div>
  </footer>
)
}